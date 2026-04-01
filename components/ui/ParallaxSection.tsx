"use client";
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Y-axis offset in px — positive = element moves up as you scroll */
  offset?: number;
  /** Opacity fade-in range (0–1) when element enters viewport */
  fadeIn?: boolean;
  /** Scale subtle zoom from this value to 1 */
  scaleFrom?: number;
}

/**
 * Wraps a section in a parallax scroll effect using framer-motion.
 * The element translates on Y and optionally fades/scales as it
 * enters the viewport — viewport-aware via IntersectionObserver under the hood.
 */
export function ParallaxSection({
  children,
  className = "",
  offset = 60,
  fadeIn = true,
  scaleFrom,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // track from element entering to leaving
  });

  // Parallax Y: starts at +offset, ends at -offset
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  // Fade in: 0 → 1 over the first 30% of travel
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);

  // Scale: always call useTransform (React hook rules) — neutral 1→1 when not used
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3],
    [scaleFrom ?? 1, 1]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          opacity: fadeIn ? opacity : 1,
          scale,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
