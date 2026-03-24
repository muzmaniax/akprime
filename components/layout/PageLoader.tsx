"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // New navigation detected
      prevPathname.current = pathname;
      setLoading(true);
      setProgress(0);

      // Simulate progress climbing to ~85% quickly
      let prog = 0;
      intervalRef.current = setInterval(() => {
        prog += Math.random() * 15 + 5;
        if (prog >= 85) {
          prog = 85;
          clearInterval(intervalRef.current!);
        }
        setProgress(prog);
      }, 120);

      // Complete after a short delay
      timerRef.current = setTimeout(() => {
        clearInterval(intervalRef.current!);
        setProgress(100);
        setTimeout(() => setLoading(false), 400);
      }, 700);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <>
          {/* Slim top progress bar */}
          <motion.div
            className="fixed top-0 left-0 z-[9999] h-[3px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #37B4B4, #29E0C8, #37B4B4)",
              backgroundSize: "200% 100%",
              width: `${progress}%`,
              boxShadow: "0 0 12px rgba(55,180,180,0.9), 0 0 4px rgba(41,224,200,0.7)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backgroundPosition: ["0% 0%", "200% 0%"] }}
            exit={{ opacity: 0 }}
            transition={{ backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" } }}
          />

          {/* Full-screen teal flash overlay on entry */}
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(55,180,180,0.08) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
