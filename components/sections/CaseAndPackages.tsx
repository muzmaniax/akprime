"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CaseStudiesSection() {
  return (
    <section className="py-12 lg:py-16 section-tint overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 mb-4">
              <span className="text-[14px] font-normal tracking-wide text-[#37B4B4]">
                 Case studies
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium text-[#082121] tracking-tighter leading-[1.05]">
              Proven <span className="text-[#37B4B4]">Results</span> <br className="hidden lg:block" />Across Industries
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Link 
            href="/case-studies/manufacturing-erp"
            className="group relative block aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 p-3 sm:p-5 lg:p-6"
          >
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80"
              alt="Featured Case Study"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/90 via-[#082121]/30 to-[#082121]/10 opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Context Labels */}
            <div className="relative z-10 flex flex-wrap gap-3 absolute top-6 left-6 lg:top-10 lg:left-10">
              <span className="px-5 py-2.5 rounded-full bg-[#37B4B4] text-[#082121] text-[14px] font-normal tracking-wide shadow-xl">
                Business strategy
              </span>
              <span className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[14px] font-normal tracking-wide">
                Infrastructure group
              </span>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5 lg:inset-x-6 lg:bottom-6 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
              <div className="max-w-2xl p-5 sm:p-7 lg:p-8 bg-[#082121]/30 backdrop-blur-2xl rounded-[24px] lg:rounded-[32px] border border-white/10 shadow-2xl">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white tracking-tighter leading-[1.05] mb-3">
                  Revenue Growth 65% in 12 months.
                </h3>
                <p className="text-white/80 text-[13px] lg:text-sm font-normal leading-relaxed max-w-xl">
                  We helped a fast-growing construction company refine its go-to-market strategy and logistics, achieving record-breaking expansion.
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 bg-[#37B4B4] hover:bg-white text-[#082121] rounded-full px-5 py-2.5 sm:px-8 sm:py-4 shadow-2xl shadow-black/20 transition-all duration-500 hover:scale-105 self-start md:self-auto shrink-0">
                 <span className="text-[13px] sm:text-[14px] font-normal tracking-wide">View case study</span>
                 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#082121] flex items-center justify-center text-white shrink-0">
                   <ArrowUpRight size={16} />
                 </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
