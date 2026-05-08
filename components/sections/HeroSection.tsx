"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Primitives";
import { TrustedLogosCarousel } from "@/components/sections/TrustedLogosCarousel";
import Aurora from "@/components/ui/Aurora";

export function HeroSection({ onBooking }: { onBooking?: () => void }) {
  return (
    <section className="relative section-dark overflow-hidden flex flex-col" style={{ minHeight: "calc(100vh - var(--navbar-h, 64px))" }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-0 bg-[#082121]">
        {/* Base image with darkening filter */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url('/images/photo-1552664730-d307ca884978')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.35) contrast(1.15) grayscale(100%)",
          }}
        />

        {/* Darker, subtle teal overlay for contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(4,20,20,0.25) 0%, rgba(2,12,12,0.45) 100%)",
          }}
        />

        {/* Aurora effect — layered on top */}
        <div className="absolute inset-0 opacity-85 mix-blend-screen pointer-events-none">
          <Aurora
            colorStops={["#1a4f4f", "#2dd4bf", "#22d3ee"]}
            amplitude={0.65}
            blend={2.3}
            speed={1.6}
          />
        </div>

        {/* Accent gradient overlays for depth */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "0%",
            left: "0%",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(45,212,191,0.12) 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "0%",
            right: "0%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(ellipse at 100% 100%, rgba(34,211,238,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Main content — vertically centred ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-3 px-5 pt-16 pb-10 text-center">

        {/* Pill badge */}
        <Reveal>
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[rgba(32,190,179,0.13)] border border-[rgba(19,122,122,0.5)] text-[12px] sm:text-[13px] whitespace-nowrap">
            <span className="text-white/70 flex items-center gap-1 sm:gap-2">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#37B4B4] inline-block shrink-0" />
              <span className="hidden sm:inline">Trusted by leading organisations</span>
              <span className="sm:hidden">Trusted by teams</span>
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
          <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
            <Link
              href="/contact"
              className="h-10 px-4 sm:px-6 rounded-lg bg-white/[0.08] border border-white/25 text-white text-[13px] sm:text-[14px] font-medium inline-flex items-center justify-center hover:bg-white/15 transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={onBooking}
              className="h-10 px-4 sm:px-6 rounded-lg bg-[#37B4B4] border border-[#36c0c0] text-[#0a3030] text-[13px] sm:text-[14px] font-medium inline-flex items-center justify-center hover:bg-[#29E0C8] transition-colors whitespace-nowrap"
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
