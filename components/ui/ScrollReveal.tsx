"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // margin: "-50px" triggers the animation slightly before the element enters
  // the viewport, preventing the jarring "pop in" when scrolling fast
  const inView = useInView(ref, { once, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // very smooth easing curve
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
