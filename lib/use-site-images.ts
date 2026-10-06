'use client'
import { useState, useEffect } from 'react'
import defaultConfig from '@/data/site-images.json'

type Config = Record<string, string>
let _config: Config = { ...(defaultConfig as Config) }
let _promise: Promise<void> | null = null

function ensureLoaded(): Promise<void> {
  if (!_promise) {
    _promise = fetch('/api/cms/images/config')
      .then(r => r.json())
      .then((data: { config: Config }) => { _config = data.config })
      .catch(() => {})
  }
  return _promise
}

export function useSiteImage(key: string): string {
  const [src, setSrc] = useState<string>(_config[key] ?? '')
  useEffect(() => {
    ensureLoaded().then(() => setSrc(_config[key] ?? ''))
  }, [key])
  return src
}

/** Load multiple CMS image keys at once — safe to call at the top level of a component. */
export function useSiteImages(keys: string[]): Record<string, string> {
  const keyStr = keys.join(',')
  const [srcs, setSrcs] = useState<Record<string, string>>(
    () => Object.fromEntries(keys.map(k => [k, _config[k] ?? '']))
  )
  useEffect(() => {
    ensureLoaded().then(() =>
      setSrcs(Object.fromEntries(keys.map(k => [k, _config[k] ?? ''])))
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyStr])
  return srcs
}
