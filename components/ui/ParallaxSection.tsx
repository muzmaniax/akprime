"use client";
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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
    offset: ["start end", "end start"],
  });

  // Silky smooth spring physics added to the scroll position
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Y parallax: enters from offset, settles at 0 through the center, exits gently upwards
  const y = useTransform(smoothProgress, [0, 0.35, 1], [offset, 0, -offset * 0.3]);

  // Opacity: fades in rapidly as soon as it breaches the viewport edge
  const opacity = useTransform(smoothProgress, [0, 0.08], [0.4, 1]);

  // Scale: optionally zooms in as it enters
  const scale = useTransform(
    smoothProgress,
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
