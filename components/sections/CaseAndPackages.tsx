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
            className="group relative block min-h-[460px] sm:min-h-[400px] lg:min-h-[450px] rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700"
          >
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80"
              alt="Featured Case Study"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/90 via-[#082121]/40 to-[#082121]/10 opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Context Labels — top-left, absolutely positioned */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 lg:top-8 lg:left-8 flex flex-wrap gap-2 sm:gap-3 z-10 mr-4">
              <span className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#37B4B4] text-[#082121] text-[12px] sm:text-[14px] font-normal tracking-wide shadow-xl">
                Business strategy
              </span>
              <span className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] sm:text-[14px] font-normal tracking-wide">
                Infrastructure group
              </span>
            </div>

            {/* Content Overlay — bottom, absolutely positioned */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 z-10">
              <div className="max-w-2xl p-4 sm:p-7 lg:p-8 bg-[#082121]/30 backdrop-blur-2xl rounded-[24px] lg:rounded-[32px] border border-white/10 shadow-2xl">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white tracking-tighter leading-[1.05] mb-2 sm:mb-3">
                  Revenue Growth 65% in 12 months.
                </h3>
                <p className="text-white/80 text-[12px] sm:text-[13px] lg:text-sm font-normal leading-relaxed max-w-xl">
                  We helped a fast-growing construction company refine its go-to-market strategy and logistics, achieving record-breaking expansion.
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 bg-[#37B4B4] hover:bg-white text-[#082121] rounded-full px-4 py-2.5 sm:px-8 sm:py-4 shadow-2xl shadow-black/20 transition-all duration-500 hover:scale-105 self-start md:self-auto shrink-0">
                 <span className="text-[12px] sm:text-[14px] font-medium tracking-wide">View case study</span>
                 <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#082121] flex items-center justify-center text-white shrink-0">
                   <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
                 </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
