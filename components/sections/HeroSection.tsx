"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, CheckCircle2, Globe2, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import Link from "next/link";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Sparkles } from "@/components/ui-layouts/sparkles";
import { TickerBand, PhotoStrip } from "@/components/sections/MidSections";

const stats = [
  { target: 99.9, suffix: "%", label: "System Uptime" },
  { target: 40, suffix: "%", label: "OpEx Reduction" },
  { target: 3, suffix: "x", label: "Faster Financial Close" },
  { target: 100, suffix: "%", label: "Visibility on ROI" },
];

const TICKER_H = "44px"; // Matches the TickerBand compact height for balance

const kpis = [
  { label: "Automation", value: 62, suffix: "%" },
  { label: "Close Time", value: 3, suffix: "d" },
  { label: "Adoption", value: 94, suffix: "%" },
];

const streams = [
  { label: "ERP Go-Live", pct: 82 },
  { label: "AI Workflows", pct: 67 },
  { label: "Finance Reporting", pct: 91 },
];

interface HeroSectionProps {
  onBooking: () => void;
}

export function HeroSection({ onBooking }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);

  const [barsVisible, setBarsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[var(--section-h)] flex flex-col overflow-hidden`}
      style={{ background: "#082121" }}
    >
      {/* Video Background Layer with Teal Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity scale-105"
          src="https://assets.mixkit.co/videos/download/mixkit-abstract-technology-network-connections-3156.mp4"
        />
        <div className="absolute inset-0 bg-[#082121]/95 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-[#37B4B4]/10 mix-blend-overlay z-10" />
      </div>

      {/* Grid parallax */}
      <motion.div style={{ y: gridY }} className="absolute inset-0 grid-bg opacity-60 pointer-events-none z-0" />

      {/* Orbs */}
      <motion.div style={{ y: orb1Y, background: "#37B4B4" }} className="orb w-[560px] h-[560px] opacity-[0.13] -top-32 -right-32" />
      <div className="orb w-[560px] h-[560px] bg-[#37B4B4] opacity-[0.11] -top-32 -right-32 pointer-events-none" />
      <div className="orb w-[380px] h-[380px] bg-[#29E0C8] opacity-[0.07] bottom-0 -left-20 pointer-events-none" style={{ animationDelay: "3s" }} />
      <div className="orb w-[260px] h-[260px] bg-[#37B4B4] opacity-[0.09] top-1/2 left-1/3 pointer-events-none" style={{ animationDelay: "5.5s" }} />

      {/* Content wrapper centered between navbar and ticker */}
      <div 
        className="relative flex-1 flex flex-col justify-center w-full z-10"
        style={{ paddingTop: "30px" }} // Adjusted to shift content down 2px, reducing bottom gap
      >
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── Left text col (Constrained) ── */}
          <div className="lg:col-span-7 xl:col-span-7 relative z-20">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <span className="section-overline mb-5 inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-wide px-3 py-1.5 sm:px-4 sm:py-2">
                <Globe2 size={12} className="sm:size-3.5" /> 
                Strategy • Middle East &amp; Africa
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-[1.4rem] sm:text-[2.2rem] lg:text-[2.35rem] font-medium text-white leading-[1.1] md:leading-[1.05] tracking-tighter mb-4 whitespace-normal"
            >
              Modernise your<br />
              <Sparkles color="#29E0C8" count={6}>
                <span className="text-[#37B4B4]">business operations</span>
              </Sparkles><br />
              <TextEffect as="span" preset="fade" per="word" className="inline">
                with AI, ERP &amp; strategic advisory
              </TextEffect>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-[15px] lg:text-[16px] text-white/80 leading-[1.7] tracking-wide max-w-xl mb-8"
            >
              Headquartered in <span className="text-[#37B4B4] font-medium">Nairobi</span> with a branch in <span className="text-[#37B4B4] font-medium">Mombasa</span>, we provide world-class tech advisory across <span className="text-white font-medium">Africa</span> and the <span className="text-white font-medium">Middle East</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-5"
            >
              <button
                onClick={onBooking}
                className="pill-e cta-pulse"
              >
                <div className="pill-e-group">
                  Book strategy consultation
                  <div className="pill-e-icon"><ArrowRight /></div>
                </div>
              </button>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="pill-f"
              >
                Explore services
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.46 }}
              className="text-white/50 text-[13px] lg:text-[13px] leading-relaxed tracking-wide max-w-lg"
            >
              Trusted by organisations across finance, logistics, healthcare, education and the public sector — in Africa and the Middle East.
            </motion.p>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/8"
            >
              {stats.map((s) => (
                <AnimatedCounter key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
              ))}
            </motion.div>
          </div>

          {/* ── Right dashboard col (Hover Widget) ── */}
          <div className="lg:col-start-9 lg:col-span-4 xl:col-start-9 xl:col-span-4 flex items-center justify-end mt-12 mb-10 lg:mt-0 lg:mb-0 relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-sm mx-auto lg:max-w-[300px] lg:scale-90 xl:scale-95 origin-right transition-transform"
            >
              {/* Main dashboard card */}
              <div className="dashboard-float relative">
                <BorderTrail
                  className="bg-gradient-to-r from-[#37B4B4] via-[#29E0C8] to-transparent opacity-70"
                  size={80}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <div
                  className="rounded-[22px] p-[10px] relative"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="pill-d !text-[10px] !h-6 !px-3 font-semibold !text-white/40 border-white/10">Live data</span>
                      </div>
                      <p className="text-white font-semibold text-sm">Operations Dashboard</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-[#37B4B4]/20 flex items-center justify-center">
                      <TrendingUp size={16} className="text-[#37B4B4]" />
                    </div>
                  </div>

                  {/* KPI tiles */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {kpis.map((k, i) => (
                      <motion.div
                        key={k.label}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                        className="rounded-[12px] p-3 text-center"
                        style={{ background: "rgba(55,180,180,0.08)", border: "1px solid rgba(55,180,180,0.15)" }}
                      >
                        <div className="text-[#37B4B4] font-bold text-lg leading-none">
                          {k.value}{k.suffix}
                        </div>
                        <div className="text-white/45 text-[10px] mt-1">{k.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3">
                    {streams.map((s, i) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-white/55">{s.label}</span>
                          <span className="text-[#37B4B4] font-semibold">{s.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg,#37B4B4,#29E0C8)" }}
                            initial={{ width: 0 }}
                            animate={barsVisible ? { width: `${s.pct}%` } : { width: 0 }}
                            transition={{ duration: 1.1, delay: 0.9 + i * 0.15, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* All systems operational */}
                  <div className="mt-4 pt-4 border-t border-white/6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-white/40 text-[11px]">All Systems Operational</span>
                  </div>
                </div>
              </div>

              {/* Floating mini-cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 rounded-xl px-3.5 py-2.5 z-20"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(55,180,180,0.25)",
                  borderRadius: "12px"
                }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#37B4B4]" />
                  <span className="text-white text-xs font-semibold whitespace-nowrap">ERP go-live on track</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute -bottom-5 -left-5 rounded-xl px-3.5 py-2.5 z-20"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(55,180,180,0.2)",
                  borderRadius: "12px"
                }}
              >
                <div className="flex items-center gap-2">
                  <Bot size={16} className="text-[#37B4B4]" />
                  <span className="text-white text-xs font-semibold whitespace-nowrap">AI workflows active: 24</span>
                </div>
              </motion.div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center,rgba(55,180,180,0.12),transparent 70%)", filter: "blur(24px)", zIndex: -1 }} />
            </motion.div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Structural Bottom TickerBand inside the Hero flow */}
      <div 
        className="relative z-20 w-full overflow-hidden bg-[#082121]"
        style={{ height: TICKER_H }}
      >
        <TickerBand />
      </div>
    </section>
  );
}
