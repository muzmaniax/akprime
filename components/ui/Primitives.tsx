"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import FadeContent from "@/components/ui/FadeContent";

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
