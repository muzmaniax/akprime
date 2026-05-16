"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { useSiteImage } from "@/lib/use-site-images";
import { useCMSContent } from "@/lib/use-cms-content";

const FILTERS = ["All", "Finance", "Systems", "Strategy", "Impact"] as const;
type Filter = (typeof FILTERS)[number];

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const cms = useCMSContent();

  const merged = caseStudies.map((cs) => {
    const cmsCs = cms?.["case-studies"]?.[cs.id] as Record<string, unknown> | undefined;
    if (!cmsCs) return cs;
    return {
      ...cs,
      ...(cmsCs.tagline ? { tagline: cmsCs.tagline as string               } : {}),
      ...(cmsCs.summary ? { summary: cmsCs.summary as string               } : {}),
      ...(cmsCs.metrics ? { metrics: cmsCs.metrics as CaseStudy["metrics"] } : {}),
    };
  });

  const visible =
    filter === "All" ? merged : merged.filter((cs) => cs.category === filter);

  return (
    <>
      {/* ── Header ── */}
      <section
        className="section-dark border-b border-white/[0.06]"
        style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "36px" }}
      >
        <div className="container-x">
          <Reveal><Eyebrow>Case Studies</Eyebrow></Reveal>
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

      {/* ── Filter bar — only shown with 3+ case studies ── */}
      {caseStudies.length > 2 && (
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
      )}

      {/* ── Cards ── */}
      <section className="section-dark" style={{ paddingTop: 32, paddingBottom: 72 }}>
        <div className="container-x">
          {visible.length === 0 ? (
            <p className="text-sm text-white/30 py-20 text-center">
              No engagements in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {visible.map((cs, i) => (
                <Reveal key={cs.id} delay={i * 80} className="h-full">
                  <CaseStudyCard cs={cs} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABannerSection />
    </>
  );
}

/* ─── Card — horizontal split (content left, image right) ───────── */
function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  const img = useSiteImage(`casestudy.${cs.id}.image`) || cs.image;

  return (
    <Link
      href={`/case-studies/${cs.id}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/0 hover:border-[#37B4B4]/30 transition-colors"
    >
      {/* Mobile — stacked */}
      <div className="md:hidden flex flex-col h-full bg-white text-[#082121] rounded-2xl overflow-hidden">
        <div className="relative h-[180px] bg-[#082121] overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            style={{ backgroundImage: `url(${img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/10 to-transparent" />
        </div>
        <div className="flex flex-col flex-1 p-5 gap-3">
          <span className="text-[10px] font-semibold tracking-[0.15em] text-[#37B4B4] uppercase">
            ● {cs.sector}
          </span>
          <div>
            <h3 className="text-[17px] leading-snug font-semibold text-[#082121]">{cs.client}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#3a5a5a]">{cs.summary}</p>
          </div>
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#082121]/8">
            <span className="text-[12px] text-[#3a5a5a] font-medium">{cs.industry}</span>
            <div className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#37B4B4] group-hover:text-[#29E0C8] transition-colors">
              View <ArrowUpRight size={13} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop — side by side */}
      <div className="hidden md:grid md:grid-cols-5 h-full bg-white text-[#082121] rounded-2xl" style={{ minHeight: 210 }}>
        <div className="col-span-3 p-5 lg:p-6 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-semibold tracking-label text-[#37B4B4] uppercase">
              {cs.sector}
            </div>
            <h3 className="mt-2 text-[18px] leading-snug font-semibold">{cs.client}</h3>
            <p className="mt-2 text-[13px] text-[#3a5a5a] leading-relaxed line-clamp-2">{cs.summary}</p>
          </div>
          <div className="flex items-end justify-between mt-4 pt-3 border-t border-[#082121]/10">
            <div>
              <div className="text-[9px] tracking-caption uppercase text-[#3a5a5a]/60 font-medium">Industry</div>
              <div className="text-[13px] font-medium text-[#082121] mt-0.5">{cs.industry}</div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#37B4B4] group-hover:gap-2.5 transition-all">
              View case study <ArrowUpRight size={13} strokeWidth={2.25} />
            </div>
          </div>
        </div>
        <div className="col-span-2 relative bg-[#082121] rounded-r-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>
      </div>
    </Link>
  );
}
