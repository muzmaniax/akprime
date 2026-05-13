"use client";

import { useState, useEffect } from "react";

export type CMSContentData = {
  "case-studies": Record<string, Record<string, unknown>>;
  insights: Record<string, Record<string, unknown>>;
};

const EMPTY: CMSContentData = { "case-studies": {}, insights: {} };

/* Module-level singleton — one fetch, shared across all components */
let _cache: CMSContentData | null = null;
let _promise: Promise<CMSContentData> | null = null;
const _listeners: Array<(d: CMSContentData) => void> = [];

function load(): Promise<CMSContentData> {
  if (_cache) return Promise.resolve(_cache);
  if (!_promise) {
    _promise = fetch("/api/cms/content")
      .then(r => r.json())
      .then((d: CMSContentData) => {
        _cache = d;
        _listeners.forEach(fn => fn(d));
        _listeners.length = 0;
        return d;
      })
      .catch(() => {
        _promise = null; // allow retry
        return EMPTY;
      });
  }
  return _promise;
}

/** Invalidate the module-level cache (call after a save so all components re-read) */
export function invalidateCMSCache() {
  _cache = null;
  _promise = null;
}

export function useCMSContent(): CMSContentData | null {
  const [data, setData] = useState<CMSContentData | null>(_cache);

  useEffect(() => {
    if (_cache) { setData(_cache); return; }
    load().then(setData);
  }, []);

  return data;
}
