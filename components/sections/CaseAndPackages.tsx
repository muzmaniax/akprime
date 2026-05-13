"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { caseStudies } from "@/data/case-studies";
import { useSiteImage } from "@/lib/use-site-images";

export function CaseStudiesSection() {
  const top = caseStudies.slice(0, 2).map((cs) => {
    const cardImage = useSiteImage(`casestudy.${cs.id}.image`) || cs.image;
    return {
      ...cs,
      image: cardImage,
    };
  });

  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <Reveal>
            <Eyebrow>Case Studies</Eyebrow>
            <h2 className="mt-3 text-white text-balance max-w-[26ch]">
              Advisory engagements with business leaders
            </h2>
            <p className="mt-3 text-[13px] text-white/60 leading-relaxed max-w-xl">
              We help leaders see their business clearly, identify the real problems, and design strategies that can actually be executed.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-[#37B4B4] hover:text-[#29E0C8] text-[13px] font-semibold transition-colors">
              All case studies <ArrowUpRight size={13} />
            </Link>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 items-stretch">
          {top.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 80} className="h-full">
              <Link
                href={`/case-studies/${cs.id}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-white/0 hover:border-[#37B4B4]/30 transition-colors"
              >
                {/* Mobile layout */}
                <div className="md:hidden flex flex-col h-full bg-white text-[#082121] rounded-2xl overflow-hidden">
                  <div className="relative h-[180px] bg-[#082121] overflow-hidden flex-shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${cs.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/5 to-transparent" />
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.15em] text-[#37B4B4] uppercase">
                      ● {cs.sector}
                    </span>
                    <div>
                      <h3 className="text-[17px] leading-snug font-semibold text-[#082121]">
                        {cs.client}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[#3a5a5a]">
                        {cs.tagline}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#082121]/8">
                      <span className="text-[12px] text-[#3a5a5a] font-medium">{cs.industry}</span>
                      <div className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#37B4B4] group-hover:text-[#29E0C8] transition-colors">
                        View <ArrowUpRight size={13} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid md:grid-cols-5 h-full bg-white text-[#082121] rounded-2xl" style={{ minHeight: 210 }}>
                  <div className="col-span-3 p-5 lg:p-6 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-semibold tracking-label text-[#37B4B4] uppercase">
                        {cs.sector}
                      </div>
                      <h3 className="mt-2 text-[18px] leading-snug font-semibold">
                        {cs.client}
                      </h3>
                      <p className="mt-2 text-[13px] text-[#3a5a5a] leading-relaxed line-clamp-2">
                        {cs.summary}
                      </p>
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
      </div>
    </section>
  );
}
