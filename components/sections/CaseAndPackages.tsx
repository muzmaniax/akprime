"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/ui/Primitives";
import { caseStudies } from "@/data/case-studies";

export function CaseStudiesSection() {
  const top = caseStudies.slice(0, 2);

  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Case Studies"
            title="Advisory engagements with business leaders"
            sub="We help leaders see their business clearly, identify the real problems, and design strategies that can actually be executed."
          />
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          {top.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 100}>
              <Link
                href={`/case-studies/${cs.id}`}
                className="group block rounded-2xl overflow-hidden border border-white/0 hover:border-[#37B4B4]/30 transition-colors"
              >
                {/* Mobile: Image + Full Card Layout */}
                <div className="md:hidden flex flex-col bg-white text-[#082121] rounded-2xl overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-[220px] bg-[#082121] overflow-hidden flex-shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${cs.image})` }}
                    />
                    {/* Subtle overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/5 to-transparent" />
                  </div>

                  {/* Content Container - Proper spacing */}
                  <div className="flex flex-col p-6 gap-4">
                    {/* Tag */}
                    <div className="inline-flex">
                      <span className="text-[10px] font-semibold tracking-[0.15em] text-[#37B4B4] uppercase">
                        ● {cs.sector}
                      </span>
                    </div>

                    {/* Headline - Company Name */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[18px] leading-[1.2] font-semibold text-[#082121]">
                        {cs.client}
                      </h3>
                      {/* Insight/Tagline - The story */}
                      <p className="text-[14px] leading-[1.6] text-[#3a5a5a] font-normal">
                        {cs.tagline}
                      </p>
                    </div>

                    {/* Footer: Metadata + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#082121]/8">
                      <span className="text-[12px] text-[#3a5a5a] font-medium">{cs.industry}</span>
                      <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37B4B4] group-hover:text-[#29E0C8] group-hover:gap-2.5 transition-all">
                        View <ArrowUpRight size={14} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop: Traditional side-by-side layout */}
                <div className="hidden md:grid md:grid-cols-5 md:min-h-[260px] bg-white text-[#082121]">
                  <div className="col-span-3 p-7 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold tracking-label text-[#37B4B4] uppercase">
                        {cs.sector}
                      </div>
                      <h3 className="mt-3 text-[22px] leading-tight font-semibold">
                        {cs.client}
                      </h3>
                      <p className="mt-3 text-[14px] text-[#3a5a5a] leading-relaxed line-clamp-3">
                        {cs.summary}
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-6 pt-5 border-t border-[#082121]/10">
                      <div>
                        <div className="text-[10px] tracking-caption uppercase text-[#3a5a5a]/70 font-medium">Industry</div>
                        <div className="text-[14px] font-semibold text-[#082121] mt-1">{cs.industry}</div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37B4B4] group-hover:gap-2.5 transition-all">
                        View case study <ArrowUpRight size={14} strokeWidth={2.25} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 relative bg-[#082121]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${cs.image})` }}
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
