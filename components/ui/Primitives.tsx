"use client";

import { type ReactNode, useRef, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeContent from "@/components/ui/FadeContent";

gsap.registerPlugin(ScrollTrigger);

/* Reveal — GSAP blur-fade scroll primitive */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <FadeContent
      delay={delay}
      duration={700}
      blur={true}
      threshold={0.12}
      className={className}
    >
      {children}
    </FadeContent>
  );
}

/* Eyebrow — small caps category tag with leading dot */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

/* StatCell — number + label */
export function StatCell({
  value,
  label,
  light = false,
}: {
  value: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "font-medium tracking-tight leading-none",
          light ? "text-[#082121]" : "text-white"
        )}
        style={{ fontSize: "clamp(2rem, 1.5rem + 2vw, 3.25rem)" }}
      >
        {value}
      </div>
      <div className={cn("text-[13px]", light ? "text-[#3a5a5a]" : "text-white/60")}>
        {label}
      </div>
    </div>
  );
}

/* CTA Button — solid teal */
export function CtaButton({
  children,
  href,
  onClick,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={2.25} />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cn("btn-cta", className)}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cn("btn-cta", className)}>
      {inner}
    </button>
  );
}

/* Ghost Button — outlined */
export function GhostButton({
  children,
  href,
  onClick,
  className,
  light = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  light?: boolean;
}) {
  const cls = cn("btn-ghost", light && "btn-ghost-light", className);
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

/* StaggerReveal — animates direct children in staggered sequence on scroll */
export function StaggerReveal({
  children,
  className,
  delay = 0,
  stagger = 0.09,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  from?: "bottom" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const items = Array.from(container.children) as HTMLElement[];
    if (!items.length) return;

    const initial: gsap.TweenVars = { autoAlpha: 0, filter: "blur(4px)" };
    if (from === "bottom") initial.y = 22;
    else { initial.scale = 0.95; initial.y = 10; }

    gsap.set(items, initial);

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 88%",
      once: true,
      onEnter: () => {
        const target: gsap.TweenVars = {
          autoAlpha: 1, filter: "blur(0px)", y: 0,
          duration: 0.65, ease: "expo.out", stagger, delay,
        };
        if (from === "scale") target.scale = 1;
        gsap.to(items, target);
      },
    });

    return () => { st.kill(); gsap.killTweensOf(items); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}

/* MagneticWrapper — subtle magnetic pull on hover (desktop only) */
export function MagneticWrapper({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * strength;
    const dy = (e.clientY - (r.top  + r.height / 2)) * strength;
    el.style.transition = "transform 120ms ease";
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* SectionHeader — eyebrow + headline + optional sub */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-balance", light ? "text-[#082121]" : "text-white")}>{title}</h2>
      {sub && (
        <p className={cn("text-[15px] md:text-[17px] leading-relaxed", light ? "text-[#3a5a5a]" : "text-white/65")}>
          {sub}
        </p>
      )}
    </div>
  );
}
