"use client";

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

export default function FadeContent({
  children,
  blur = true,
  duration = 700,
  delay = 0,
  ease = "power2.out",
  threshold = 0.12,
  initialOpacity = 0,
  className = "",
  style,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getSeconds = (val: number) => (val > 10 ? val / 1000 : val);

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? "blur(6px)" : "blur(0px)",
      y: 12,
      willChange: "opacity, filter, transform",
    });

    const tl = gsap.timeline({ paused: true, delay: getSeconds(delay) });

    tl.to(el, {
      autoAlpha: 1,
      filter: "blur(0px)",
      y: 0,
      duration: getSeconds(duration),
      ease,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${(1 - threshold) * 100}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
