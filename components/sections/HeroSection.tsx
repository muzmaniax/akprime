"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Primitives";
import { TrustedLogosCarousel } from "@/components/sections/TrustedLogosCarousel";

export function HeroSection({ onBooking }: { onBooking?: () => void }) {
  return (
    <section className="relative section-dark overflow-hidden flex flex-col" style={{ minHeight: "calc(100vh - var(--navbar-h, 64px))" }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-0">
        {/* Photo */}
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark multiply overlay — matches Figma rgba(8,35,35,0.98) multiply */}
        <div className="absolute inset-0 bg-[#082323] opacity-[0.93] mix-blend-multiply" />

        {/* Diagonal gradient blob — top centre-right (Figma Vector, -15.81deg) */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "30%",
            width: "55%",
            height: "45%",
            background:
              "linear-gradient(135deg, rgba(55,180,180,0.18) 0%, rgba(14,62,62,0.08) 50%, transparent 100%)",
            transform: "rotate(-16deg)",
            filter: "blur(48px)",
          }}
        />

        {/* Diagonal gradient blob — bottom left (Figma Vector1, -103.85deg) */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-5%",
            left: "0%",
            width: "30%",
            height: "50%",
            background:
              "linear-gradient(200deg, rgba(55,180,180,0.14) 0%, rgba(8,33,33,0.06) 60%, transparent 100%)",
            transform: "rotate(-104deg)",
            filter: "blur(56px)",
          }}
        />

        {/* Diagonal gradient blob — bottom right (Figma Vector2) */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-15%",
            right: "-2%",
            width: "50%",
            height: "45%",
            background:
              "linear-gradient(135deg, rgba(55,180,180,0.12) 0%, transparent 70%)",
            transform: "rotate(-16deg)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* ── Main content — vertically centred ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-3 px-5 pt-16 pb-10 text-center">

        {/* Pill badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[rgba(32,190,179,0.13)] border border-[rgba(19,122,122,0.5)] text-[13px]">
            <span className="text-white/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4] inline-block shrink-0" />
              Trusted by leading organisations
            </span>
            <Link
              href="/case-studies"
              className="text-[#4cf0f0] hover:text-white font-normal transition-colors"
            >
              See case studies
            </Link>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={80}>
          <h1
            className="text-white font-medium text-center text-balance"
            style={{
              fontSize: "clamp(32px, 3.6vw, 52px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: "780px",
            }}
          >
            Strategic consulting for businesses ready to scale.
          </h1>
        </Reveal>

        {/* Body */}
        <Reveal delay={160}>
          <p
            className="text-white/75 font-normal text-center"
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.55,
              maxWidth: "620px",
            }}
          >
            We help organisations navigate complexity, make informed decisions, and build
            systems that scale — through clarity, structure, and disciplined execution.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={240}>
          <div className="flex items-center gap-3 mt-1">
            <Link
              href="/contact"
              className="h-10 px-6 rounded-lg bg-white/[0.08] border border-white/25 text-white text-[14px] font-medium inline-flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={onBooking}
              className="h-10 px-6 rounded-lg bg-[#37B4B4] border border-[#36c0c0] text-[#0a3030] text-[14px] font-medium inline-flex items-center justify-center hover:bg-[#29E0C8] transition-colors"
            >
              Book a Call
            </button>
          </div>
        </Reveal>
      </div>

      {/* ── Client logos — anchored to bottom ── */}
      <div className="relative w-full border-t border-white/[0.06]">
        <TrustedLogosCarousel />
      </div>

    </section>
  );
}
