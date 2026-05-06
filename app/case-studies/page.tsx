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
                  <div className="flex flex-col md:grid md:grid-cols-5 md:min-h-[280px]">
                    {/* Image on top for mobile, right side on desktop */}
                    <div className="md:hidden relative bg-[#082121] h-[180px] w-full order-first">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cs.image})` }} />
                    </div>

                    {/* Text content */}
                    <div className="col-span-1 md:col-span-3 p-4 sm:p-5 md:p-7 lg:p-8 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-[#37B4B4] uppercase">
                          {cs.sector}
                        </div>
                        <h3 className="mt-2 sm:mt-3 text-[#082121] text-[18px] sm:text-[20px] md:text-[22px] leading-tight font-semibold line-clamp-2 sm:line-clamp-3">{cs.client}</h3>
                        <p className="mt-2 sm:mt-3 text-[13px] sm:text-[14px] text-[#3a5a5a] leading-relaxed line-clamp-3 md:line-clamp-3">{cs.summary}</p>
                      </div>
                      <div className="flex flex-col gap-4 mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-[#082121]/10">
                        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2">
                          <div>
                            <div className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#3a5a5a]/70 font-medium">Industry</div>
                            <div className="text-[13px] sm:text-[14px] font-semibold text-[#082121] mt-0.5">{cs.industry}</div>
                          </div>
                          <div>
                            <div className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#3a5a5a]/70 font-medium">Year</div>
                            <div className="text-[13px] sm:text-[14px] font-semibold text-[#082121] mt-0.5">{cs.date.split(",")[1]?.trim() ?? cs.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[12px] sm:text-[13px] font-semibold text-[#37B4B4] group-hover:gap-2.5 transition-all">
                          <span className="hidden sm:inline">View case study</span>
                          <span className="sm:hidden">View case study</span>
                          <ArrowUpRight size={14} strokeWidth={2.25} />
                        </div>
                      </div>
                    </div>

                    {/* Image on right for desktop */}
                    <div className="hidden md:block col-span-1 md:col-span-2 relative bg-[#082121]">
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
