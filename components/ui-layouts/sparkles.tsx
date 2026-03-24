"use client";

import React, { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
}

function generateSparkle(count = 6): Sparkle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `sparkle-${i}`,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.floor(Math.random() * 12) + 6,
    delay: Math.random() * 2,
    duration: Math.random() * 1.5 + 1,
  }));
}

export function Sparkles({
  children,
  className,
  color = "#37B4B4",
  count = 8,
}: {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  count?: number;
}) {
  const sparkles = React.useMemo(() => generateSparkle(count), [count]);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none absolute select-none"
          style={{ left: s.x, top: s.y, zIndex: 10 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2 + 1,
          }}
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 33.5 68 33.5 68C33.5 68 33.7973 50.7854 41 43.5C48.2027 36.2146 68 34 68 34C68 34 48.0 33.6793 41 25.5C33.5 16.5 33.5 0 33.5 0C33.5 0 33.3 16.7222 26.5 25.5Z"
              fill={color}
            />
          </svg>
        </motion.span>
      ))}
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}
