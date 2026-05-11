"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Primitives";
import { TrustedLogosCarousel } from "@/components/sections/TrustedLogosCarousel";
import Waves from "@/components/ui/Waves";

export function HeroSection({ onBooking }: { onBooking?: () => void }) {
  return (
    <section className="relative section-dark overflow-hidden flex flex-col" style={{ minHeight: "calc(100vh - var(--navbar-h, 64px))" }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-0 bg-[#060f0f]">

        {/* Base image — BW, heavily darkened */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/images/hero-workspace-bw.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.28) contrast(1.2) grayscale(100%)",
          }}
        />

        {/* True black depth overlay — restores typography clarity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, rgba(0,0,0,0.72), rgba(0,0,0,0.82)),
              radial-gradient(ellipse at top, rgba(20,80,75,0.18) 0%, transparent 60%)
            `,
          }}
        />

        {/* Waves — Perlin-noise field lines in akprime teal, cursor-reactive */}
        <div className="absolute inset-0 pointer-events-none">
          <Waves
            lineColor="rgba(55, 180, 180, 0.13)"
            backgroundColor="transparent"
            waveSpeedX={0.014}
            waveSpeedY={0.006}
            waveAmpX={38}
            waveAmpY={18}
            xGap={14}
            yGap={40}
            friction={0.93}
            tension={0.006}
            maxCursorMove={110}
          />
        </div>

        {/* Asymmetric accent glow — top-right primary source */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            right: "-5%",
            width: "65%",
            height: "70%",
            background:
              "radial-gradient(ellipse at 85% 10%, rgba(19,111,99,0.22) 0%, transparent 65%)",
          }}
        />

        {/* Secondary glow — bottom-left, much dimmer */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "0%",
            left: "0%",
            width: "45%",
            height: "50%",
            background:
              "radial-gradient(ellipse at 0% 100%, rgba(11,44,44,0.28) 0%, transparent 70%)",
          }}
        />

        {/* Bottom fog — grounds logos + CTAs, adds cinematic depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 42%)",
          }}
        />

        {/* Noise grain — subtle texture, makes gradients feel less flat */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.028,
            mixBlendMode: "soft-light",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* ── Main content — vertically centred ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-3 px-5 pt-16 pb-10 text-center">

        {/* Pill badge — glass dark style */}
        <Reveal>
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] text-[12px] sm:text-[13px] whitespace-nowrap">
            <span className="text-white/65 flex items-center gap-1 sm:gap-2">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#37B4B4] inline-block shrink-0" />
              <span className="hidden sm:inline">Trusted by leading organisations</span>
              <span className="sm:hidden">Trusted by teams</span>
            </span>
            <Link
              href="/case-studies"
              className="text-[#7AE7DC] hover:text-white font-normal transition-colors"
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
              maxWidth: "700px",
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
            }}
          >
            Strategic consulting for businesses ready to scale.
          </h1>
        </Reveal>

        {/* Body */}
        <Reveal delay={160}>
          <p
            className="text-white/80 font-normal text-center"
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.55,
              maxWidth: "580px",
            }}
          >
            We help organisations navigate complexity, make informed decisions, and build
            systems that scale — through clarity, structure, and disciplined execution.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={240}>
          <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap justify-center">
            <Link
              href="/contact"
              className="h-10 px-4 sm:px-6 rounded-lg bg-white/[0.05] border border-white/20 text-white text-[13px] sm:text-[14px] font-medium inline-flex items-center justify-center hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={onBooking}
              className="h-10 px-4 sm:px-6 rounded-lg bg-[#37B4B4] border border-[#36c0c0] text-[#0a3030] text-[13px] sm:text-[14px] font-medium inline-flex items-center justify-center hover:bg-[#45cfcf] transition-colors whitespace-nowrap shadow-[0_10px_40px_rgba(55,180,180,0.18)]"
            >
              Book a Call
            </button>
          </div>
        </Reveal>
      </div>

      {/* ── Client logos — anchored to bottom ── */}
      <div className="relative w-full border-t border-white/[0.05]">
        <TrustedLogosCarousel />
      </div>

    </section>
  );
}
