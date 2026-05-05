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
                className="group block bg-white text-[#082121] rounded-3xl overflow-hidden border border-white/0 hover:border-[#37B4B4]/30 transition-colors"
              >
                <div className="grid grid-cols-5 min-h-[260px]">
                  <div className="col-span-3 p-7 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold tracking-label text-[#37B4B4] uppercase">
                        {cs.sector}
                      </div>
                      <h3 className="mt-3 text-[#082121] text-[22px] leading-tight font-medium">
                        {cs.client}
                      </h3>
                      <p className="mt-3 text-[14px] text-[#3a5a5a] leading-relaxed line-clamp-3">
                        {cs.summary}
                      </p>
                    </div>
                    <div className="flex items-end justify-between mt-6 pt-5 border-t border-[#082121]/10">
                      <div>
                        <div className="text-[10px] tracking-caption uppercase text-[#3a5a5a]/70">Industry</div>
                        <div className="text-[13px] font-medium text-[#082121] mt-1">{cs.industry}</div>
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
