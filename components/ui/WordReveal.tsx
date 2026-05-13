"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ─── Token classifier ─────────────────────────────────────────── */
type Cls = "metric" | "impact" | "label" | "normal";

const IMPACT_WORDS = new Set([
  "recovered","delivered","achieved","reduced","increased","eliminated","saved",
  "clean","compliant","accurate","resolved","reinvested","complete","modern",
  "zero","full","accuracy","visibility","control","reliable","clear","structured",
  "verified","audit-ready","migrated","launched","transformed","streamlined",
  "automated","deployed","rebuilt","restructured","secured","closed","established",
  "restored","rectified","overhauled","remediated","standardised","standardized",
]);

function classify(raw: string): Cls {
  const w = raw.replace(/^["""''([\s]+|["""''),;\]!?]+$/g, "");

  if (/^Results?:?$/i.test(w)) return "label";

  // Numbers, currency, percentages, time quantities
  if (
    /^(KSh|Ksh|USD|€|£|\$|Kes)/i.test(w) ||
    /^\d[\d,.]*([%+]|[MKBm]b?)?$/.test(w)   // e.g. 8.5M  100%  3  40+
  ) return "metric";

  if (IMPACT_WORDS.has(w.toLowerCase())) return "impact";

  return "normal";
}

const CLS_MAP: Record<Cls, string> = {
  metric: "text-white",
  impact: "text-white",
  label:  "hidden",
  normal: "text-white",
};

/* ─── WordReveal ────────────────────────────────────────────────── */
export function WordReveal({
  text,
  className = "",
  stagger = 0.032,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const tokens = text.split(/(\s+)/);
  let wordIdx = 0;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {tokens.map((tok, i) => {
        /* preserve whitespace as a plain inline space */
        if (/^\s+$/.test(tok)) {
          return (
            <span key={i} aria-hidden="true" className="inline-block w-[0.28em]" />
          );
        }

        const cls   = classify(tok);
        const delay = reduced ? 0 : wordIdx++ * stagger;

        return (
          <motion.span
            key={i}
            aria-hidden="true"
            className={`inline-block ${CLS_MAP[cls]}`}
            initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 12, filter: "blur(3px)" }
            }
            transition={{
              duration: reduced ? 0 : 0.42,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {tok}
          </motion.span>
        );
      })}
    </span>
  );
}
