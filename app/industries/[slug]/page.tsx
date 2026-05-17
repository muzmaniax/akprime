"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { industriesData } from "@/data/industries";
import { Reveal } from "@/components/ui/Primitives";
import { useSiteImage } from "@/lib/use-site-images";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function IndustryPage({ params }: Props) {
  const resolvedParams = use(params);
  const industry = industriesData.find((i) => i.slug === resolvedParams.slug);

  // Hook must be called unconditionally before any early returns
  const industryPhoto = useSiteImage(`industry.${resolvedParams.slug}`);

  if (!industry) notFound();

  const photo = industryPhoto || industry.photo;

  return (
    <div className="bg-white min-h-screen">

      {/* ── 1. Hero ── */}
      <section
        className="relative flex flex-col justify-end overflow-hidden text-white"
        style={{ minHeight: "min(72vh, 560px)" }}
      >
        {/* Photo */}
        <img
          src={photo}
          alt={industry.name}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          style={{ filter: "brightness(0.45) saturate(0.7)" }}
        />

        {/* Dark cinematic overlay — no teal wash */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.60) 50%, rgba(2,8,8,0.90) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 container-x pb-10 pt-6 sm:pb-14">

          {/* Back button */}
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-[13px] font-normal transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Industries
          </Link>

          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 backdrop-blur-sm">
              Industry Sector
            </span>
            <span className="w-1 h-1 rounded-full bg-white/25" />
            <span className="text-[13px] text-white/65 font-normal">{industry.name}</span>
          </div>

          {/* Headline */}
          <h1
            className="text-white font-medium text-balance mb-5 max-w-[18ch]"
            style={{
              fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            {industry.heroHeadline}
          </h1>

          {/* Sub */}
          <p
            className="text-white/70 font-normal leading-relaxed mb-8 max-w-lg"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            {industry.shortDescription}
          </p>

          {/* CTA — inline, never full-width */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-[#37B4B4] text-[#082121] text-[14px] font-semibold hover:bg-[#45cfcf] transition-colors shadow-[0_8px_32px_rgba(55,180,180,0.25)] whitespace-nowrap"
          >
            {industry.cta}
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* ── 2. Problem / Solution ── */}
      <section className="py-16 sm:py-24 bg-[#F4FAFA]">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Challenges */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <p className="eyebrow mb-3">Sector Bottlenecks</p>
                  <h2 className="text-[#082121] font-medium mb-8 text-balance"
                    style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", lineHeight: 1.15 }}>
                    What's holding {industry.name} back.
                  </h2>
                </Reveal>

                <div className="flex flex-col gap-3">
                  {industry.challenges.map((pain, idx) => (
                    <Reveal key={idx} delay={idx * 60}>
                      <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-[#082121]/6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <X size={13} strokeWidth={2.5} className="text-red-400" />
                        </div>
                        <p className="text-[14px] text-[#3a5a5a] leading-relaxed">{pain}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Solutions + Outcomes */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="bg-white rounded-2xl border border-[#082121]/6 shadow-sm overflow-hidden">
                  <div className="p-6 sm:p-8 border-b border-[#082121]/6">
                    <p className="eyebrow mb-3">Strategic Interventions</p>
                    <h2 className="text-[#082121] font-medium text-balance"
                      style={{ fontSize: "clamp(1.35rem, 2.5vw, 1.875rem)", lineHeight: 1.15 }}>
                      How AK Prime modernises {industry.name}.
                    </h2>
                  </div>

                  {/* Stepper */}
                  <div className="p-6 sm:p-8">
                    <div className="relative pl-8 border-l-2 border-[#37B4B4]/20 space-y-8 mb-8">
                      {industry.solutions.map((sol, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[2.65rem] w-9 h-9 bg-white border-2 border-[#37B4B4] rounded-full flex items-center justify-center shadow-sm shadow-[#37B4B4]/15">
                            <span className="text-[#082121] font-semibold text-[13px]">{idx + 1}</span>
                          </div>
                          <p className="text-[11px] font-semibold tracking-widest uppercase text-[#37B4B4] mb-1">
                            Phase {idx + 1}
                          </p>
                          <p className="text-[14px] text-[#3a5a5a] leading-relaxed">{sol}</p>
                        </div>
                      ))}
                    </div>

                    {/* Outcomes */}
                    <div className="bg-[#082121] rounded-xl p-6 sm:p-7">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4] animate-pulse" />
                        <h3 className="text-white font-medium text-[15px] tracking-[-0.01em]">
                          Expected Outcomes
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {industry.outcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-[#37B4B4] shrink-0 mt-0.5" />
                            <span className="text-white/85 text-[14px] leading-snug">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. CTA Banner ── */}
      <section className="bg-[#082121] py-20 px-5 relative overflow-hidden">
        <div className="cta-glow-bg" />
        <div className="container-x max-w-2xl text-center relative z-10">
          <Reveal>
            <p className="eyebrow justify-center mb-5">{industry.name}</p>
            <h2
              className="text-white font-medium text-balance mb-5"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Ready to lead the {industry.name} sector?
            </h2>
            <p className="text-white/60 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
              Partner with analysts and engineers who understand your specialised operational workflows.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-7 rounded-lg bg-[#37B4B4] text-[#082121] text-[14px] font-semibold hover:bg-[#45cfcf] transition-colors shadow-[0_10px_40px_rgba(55,180,180,0.18)] whitespace-nowrap"
            >
              {industry.cta}
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
