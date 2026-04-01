"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CaseStudiesSection() {
  return (
    <section className="py-24 lg:py-40 bg-[#f0f4f8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-20 lg:mb-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#37B4B4] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#37B4B4] font-mono">
                CASE STUDIES
              </span>
            </div>
            
            <h2 className="text-5xl lg:text-8xl font-medium text-[#082121] tracking-tight leading-[1.1] font-serif italic">
              Proven <span className="text-[#37B4B4] not-italic font-bold">Results</span> Across Industries
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Link 
            href="/case-studies/manufacturing-erp"
            className="group relative block aspect-[16/10] lg:aspect-[21/9] rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(8,33,33,0.15)] transition-all duration-700 hover:shadow-[0_48px_80px_-16px_rgba(8,33,33,0.2)]"
          >
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80"
              alt="Featured Case Study"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/80 via-[#082121]/20 to-transparent" />
            
            {/* Float Labels */}
            <div className="absolute top-10 left-10 flex gap-4">
              <span className="px-6 py-2.5 rounded-full bg-[#37B4B4] text-white text-[10px] font-black uppercase tracking-[0.2em]">
                Business Strategy
              </span>
              <span className="px-6 py-2.5 rounded-full bg-white text-[#082121] text-[10px] font-black uppercase tracking-[0.2em]">
                Construction Group
              </span>
            </div>

            {/* Content Floor */}
            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between gap-12">
              <div className="max-w-2xl p-10 lg:p-14 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 shadow-2xl">
                <h3 className="text-3xl lg:text-6xl font-bold text-white tracking-tighter leading-[0.95] mb-6">
                  Helped a construction firm grow revenue 65% in 12 months.
                </h3>
                <p className="text-white/80 text-sm lg:text-lg font-medium leading-relaxed max-w-xl">
                  We helped a fast-growing construction company refine its go-to-market strategy, resulting in a 65% revenue increase in just 12 months.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-4 bg-white rounded-full px-10 py-5 shadow-2xl shadow-black/20 transition-all duration-500 hover:scale-105 hover:bg-[#37B4B4] hover:text-white">
                 <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#082121] group-hover:text-white transition-colors">View Case Study</span>
                 <div className="w-12 h-12 rounded-full bg-[#082121] flex items-center justify-center text-white">
                   <ArrowUpRight size={20} />
                 </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
