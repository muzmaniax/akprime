"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { caseStudies, CaseStudy } from "@/data/case-studies";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#F4FAFA] min-h-screen font-sans selection:bg-[#37B4B4]/30 selection:text-[#37B4B4] pb-24">
      {/* Page hero */}
      <section className="pt-14 pb-14 lg:pt-20 lg:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="section-overline mb-6">Proven outcomes</span>
              <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-medium text-[#082121] tracking-tighter leading-[1.05] mt-6 mb-6">
                Real results across Africa &amp; the Middle East
              </h1>
              <p className="text-base lg:text-lg text-[#082121]/60 leading-relaxed max-w-xl">
                We bridge the gap between <span className="text-[#082121] font-medium">high-level strategy</span> and <span className="text-[#082121] font-medium">technical execution</span>. Explore how we've helped leading organisations <span className="text-[#37B4B4] font-medium">modernise their core operations</span>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case study cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:gap-14">
            {caseStudies.map((study, index) => (
              <ScrollReveal key={study.id} delay={index * 0.05}>
                <CaseStudyCard study={study} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.id}`}
      className="group relative block aspect-[16/9] lg:aspect-[21/7] rounded-2xl lg:rounded-3xl overflow-hidden border border-[#082121]/5 transition-all duration-700"
    >
      <img
        src={study.image}
        alt={study.title}
        className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:brightness-90"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/95 via-[#082121]/30 to-transparent" />

      {/* Category pills (top-left) */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 flex gap-2">
        <span className="tag tag-primary">
          {study.solution}
        </span>
        <span className="tag tag-muted">
          {study.industry}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:bottom-8 lg:left-8 lg:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div className="max-w-2xl">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-medium text-white tracking-tight leading-[1.1] mb-2 sm:mb-3">
            {study.tagline || study.title}
          </h2>
          <p className="text-white/60 text-[13px] sm:text-sm leading-relaxed max-w-lg line-clamp-2 sm:line-clamp-none">
            {study.summary}
          </p>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 bg-[#37B4B4] text-[#082121] rounded-full px-5 py-2 sm:px-6 sm:py-3 shadow-xl shrink-0 group-hover:bg-white transition-colors duration-300 self-start sm:self-auto">
          <span className="text-[13px] font-medium whitespace-nowrap">View results</span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#082121] flex items-center justify-center text-white">
            <ArrowUpRight size={11} />
          </div>
        </div>
      </div>
    </Link>
  );
}
