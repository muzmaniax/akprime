"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";

export default function CaseStudiesPage() {
  return (
    <>
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x">
          <Reveal><Eyebrow>Case Studies</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance max-w-[22ch]" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}>
              Advisory engagements with business leaders.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-2xl">
              We help leaders see their business clearly, identify the real problems,
              and design strategies that can actually be executed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-dark section-py">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-5">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.id} delay={(i % 4) * 80}>
                <Link
                  href={`/case-studies/${cs.id}`}
                  className="group block bg-white text-[#082121] rounded-3xl overflow-hidden border border-white/0 hover:border-[#37B4B4]/30 transition-colors"
                >
                  <div className="grid grid-cols-5 min-h-[280px]">
                    <div className="col-span-3 p-7 lg:p-8 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-semibold tracking-[0.18em] text-[#37B4B4] uppercase">
                          {cs.sector}
                        </div>
                        <h3 className="mt-3 text-[#082121] text-[22px] leading-tight font-medium">{cs.client}</h3>
                        <p className="mt-3 text-[14px] text-[#3a5a5a] leading-relaxed line-clamp-3">{cs.summary}</p>
                      </div>
                      <div className="flex items-end justify-between mt-6 pt-5 border-t border-[#082121]/10">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                          <div>
                            <div className="text-[10px] tracking-[0.16em] uppercase text-[#3a5a5a]/70">Industry</div>
                            <div className="text-[12px] font-medium text-[#082121] mt-0.5">{cs.industry}</div>
                          </div>
                          <div>
                            <div className="text-[10px] tracking-[0.16em] uppercase text-[#3a5a5a]/70">Year</div>
                            <div className="text-[12px] font-medium text-[#082121] mt-0.5">{cs.date.split(",")[1]?.trim() ?? cs.date}</div>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37B4B4] group-hover:gap-2.5 transition-all">
                          View case study <ArrowUpRight size={14} strokeWidth={2.25} />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 relative bg-[#082121]">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cs.image})` }} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection />
    </>
  );
}
