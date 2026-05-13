"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { useSiteImage } from "@/lib/use-site-images";

/* ─── Category pill styles ─── */
const PILL: Record<CaseStudy["category"], string> = {
  Finance:  "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Systems:  "bg-sky-50    text-sky-700    border border-sky-200",
  Strategy: "bg-violet-50 text-violet-700 border border-violet-200",
  Impact:   "bg-amber-50  text-amber-700  border border-amber-200",
};

const FILTERS = ["All", "Finance", "Systems", "Strategy", "Impact"] as const;
type Filter = (typeof FILTERS)[number];

/* ─── Page ─── */
export default function CaseStudiesPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? caseStudies : caseStudies.filter((cs) => cs.category === filter);

  const [featured, ...rest] = visible;

  return (
    <>
      {/* ── Header ── */}
      <section
        className="section-dark border-b border-white/[0.06]"
        style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "36px" }}
      >
        <div className="container-x">
          <Reveal>
            <Eyebrow>Case Studies</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-3 text-white text-balance max-w-[22ch]"
              style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}
            >
              Advisory engagements with business leaders.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-lg">
              We help leaders see their business clearly, identify the real problems, and design
              strategies that can actually be executed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="section-dark border-b border-white/[0.06]" style={{ paddingTop: 14, paddingBottom: 14 }}>
        <div className="container-x flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  filter === f
                    ? "border-[#37B4B4] text-[#37B4B4] bg-[#37B4B4]/10"
                    : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-xs text-white/20 shrink-0 tabular-nums">
            {visible.length} engagement{visible.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Cards ── */}
      <section className="section-dark" style={{ paddingTop: 24, paddingBottom: 56 }}>
        <div className="container-x">
          {visible.length === 0 ? (
            <p className="text-sm text-white/30 py-20 text-center">
              No engagements in this category yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Featured — first card, cinematic full-bleed */}
              {featured && (
                <Reveal>
                  <FeaturedCard cs={featured} />
                </Reveal>
              )}

              {/* Compact grid — remaining */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((cs, i) => (
                    <Reveal key={cs.id} delay={i * 60} className="h-full">
                      <CompactCard cs={cs} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <CTABannerSection />
    </>
  );
}

/* ─── Featured card ─────────────────────────────────────────────── */
function FeaturedCard({ cs }: { cs: CaseStudy }) {
  const img = useSiteImage(`casestudy.${cs.id}.image`) || cs.image;

  return (
    <Link
      href={`/case-studies/${cs.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.07] h-80"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
        style={{ backgroundImage: `url(${img})` }}
      />

      {/* Layered gradients — dark left anchor + bottom lift */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content — pinned inside max-w so it never bleeds into photo */}
      <div className="relative h-full flex flex-col justify-between p-7 md:p-9 max-w-xl">

        {/* Top meta */}
        <div className="flex items-center gap-2.5">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${PILL[cs.category]}`}>
            {cs.category}
          </span>
          <span className="text-xs text-white/35">{cs.client}</span>
          <span className="text-white/15 text-xs">·</span>
          <span className="text-xs text-white/35">{cs.duration}</span>
        </div>

        {/* Headline */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-heading text-white">
            {cs.tagline}
          </h2>
          <p className="mt-2 text-xs text-white/40">{cs.industry} · {cs.location}</p>
        </div>

        {/* Bottom row — metrics + CTA */}
        <div className="flex items-end justify-between gap-6">
          {/* Inline metrics */}
          <div className="flex items-center gap-5 flex-wrap">
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-sm font-bold text-[#37B4B4] leading-none tabular-nums">{m.value}</p>
                <p className="text-[11px] text-white/30 mt-1 lowercase tracking-wide">{m.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <span className="text-xs font-semibold text-white/40 group-hover:text-[#37B4B4] flex items-center gap-1.5 transition-colors duration-200 shrink-0">
            View case study
            <ArrowUpRight
              size={13}
              strokeWidth={2}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Compact card ───────────────────────────────────────────────── */
function CompactCard({ cs }: { cs: CaseStudy }) {
  const img = useSiteImage(`casestudy.${cs.id}.image`) || cs.image;
  const year = cs.date.split(",")[1]?.trim() ?? cs.date;

  return (
    <Link
      href={`/case-studies/${cs.id}`}
      className="group h-full flex flex-col bg-white text-[#082121] rounded-xl overflow-hidden border border-black/[0.07] hover:shadow-[0_12px_36px_rgba(0,0,0,0.11)] transition-shadow duration-300"
    >
      {/* Image — compact */}
      <div className="relative h-40 bg-[#0d2929] overflow-hidden shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PILL[cs.category]}`}>
            {cs.category}
          </span>
          <span className="text-xs text-white/50">{cs.duration}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Client + industry */}
        <p className="text-xs text-gray-400 leading-none">{cs.client} · {cs.industry}</p>

        {/* Headline */}
        <h3 className="flex-1 text-[15px] font-semibold leading-snug tracking-heading text-[#082121]">
          {cs.tagline}
        </h3>

        {/* Inline metrics — compact sentence format */}
        <p className="text-xs text-gray-400 leading-relaxed">
          {cs.metrics.slice(0, 2).map((m, i) => (
            <span key={m.label}>
              {i > 0 && <span className="mx-1.5 text-gray-300">·</span>}
              <span className="font-semibold text-[#37B4B4]">{m.value}</span>
              {" "}
              <span className="lowercase">{m.label}</span>
            </span>
          ))}
        </p>

        {/* Footer */}
        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-xs text-gray-400">{year}</span>
          <ArrowUpRight
            size={13}
            strokeWidth={1.75}
            className="text-gray-300 group-hover:text-[#37B4B4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
}
