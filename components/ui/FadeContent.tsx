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
  from?: "bottom" | "left" | "right" | "scale";
  distance?: number;
}

export default function FadeContent({
  children,
  blur = true,
  duration = 650,
  delay = 0,
  ease = "expo.out",
  threshold = 0.12,
  initialOpacity = 0,
  className = "",
  style,
  from = "bottom",
  distance = 22,
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const toSec = (v: number) => (v > 10 ? v / 1000 : v);

    const initial: gsap.TweenVars = {
      autoAlpha: initialOpacity,
      filter: blur ? "blur(6px)" : "blur(0px)",
      willChange: "opacity, filter, transform",
    };

    if (from === "bottom")      { initial.y = distance; }
    else if (from === "left")   { initial.x = -distance; initial.y = 0; }
    else if (from === "right")  { initial.x = distance;  initial.y = 0; }
    else if (from === "scale")  { initial.scale = 0.94;  initial.y = distance * 0.4; }

    gsap.set(el, initial);

    const target: gsap.TweenVars = {
      autoAlpha: 1,
      filter: "blur(0px)",
      x: 0, y: 0,
      duration: toSec(duration),
      ease,
    };
    if (from === "scale") target.scale = 1;

    const tl = gsap.timeline({ paused: true, delay: toSec(delay) });
    tl.to(el, target);

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
