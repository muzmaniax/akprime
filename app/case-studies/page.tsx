"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { caseStudies, CaseStudy } from "@/data/case-studies";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CATEGORIES = ["All", "Systems", "Finance", "Strategy", "Impact"] as const;

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");

  const filteredStudies = useMemo(() => {
    if (activeCategory === "All") return caseStudies;
    return caseStudies.filter((study) => study.category === (activeCategory as any));
  }, [activeCategory]);

  return (
    <main className="bg-[#F4FAFA] min-h-screen font-sans selection:bg-[#37B4B4]/30 selection:text-[#37B4B4] pb-24">
      {/* Hero Section - Scaled Down Header */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#37B4B4] font-mono">
                  PROVEN OUTCOMES
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-black text-[#082121] uppercase tracking-tighter leading-[1.1] mb-6">
                Results Across<br />
                <span className="text-[#37B4B4]">Industries.</span>
              </h1>
              
              <p className="text-base lg:text-lg text-[#082121]/60 leading-relaxed font-medium max-w-xl">
                We bridge the gap between high-level strategy and technical execution. Explore how we've helped leading organizations across Africa modernize their core operations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Section - Tightly Integrated */}
      <section className="sticky top-[60px] lg:top-[68px] z-30 pb-4 bg-[#F4FAFA]/80 backdrop-blur-md border-b border-[#082121]/5 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border",
                  activeCategory === cat
                    ? "bg-[#082121] border-[#082121] text-white shadow-xl shadow-[#082121]/10"
                    : "bg-white/80 text-[#082121]/40 border-[#082121]/5 hover:bg-white hover:text-[#082121] hover:border-[#082121]/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section - Balanced Large Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:gap-16">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, index) => (
                <ScrollReveal key={study.id} delay={index * 0.05}>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CaseStudyLargeCard study={study} />
                  </motion.div>
                </ScrollReveal>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseStudyLargeCard({ study }: { study: CaseStudy }) {
  return (
    <Link 
      href={`/case-studies/${study.id}`}
      className="group relative block aspect-[16/10] lg:aspect-[21/8] rounded-[24px] lg:rounded-[32px] overflow-hidden border border-[#082121]/5 transition-all duration-700"
    >
      <img 
        src={study.image} 
        alt={study.title}
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100" 
      />
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/90 via-[#082121]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
      
      {/* Branding Elements */}
      <div className="absolute top-8 left-8 lg:top-10 lg:left-10 flex gap-3">
        <span className="px-4 py-1.5 rounded-full bg-[#37B4B4] text-[#082121] text-[9px] font-black uppercase tracking-[0.2em] font-mono shadow-xl">
          {study.solution}
        </span>
        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] font-mono">
          {study.industry}
        </span>
      </div>

      {/* Content Layout - Compact Density */}
      <div className="absolute bottom-8 left-8 right-8 lg:bottom-10 lg:left-10 lg:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl bg-[#082121]/20 backdrop-blur-3xl p-8 lg:p-10 rounded-[20px] lg:rounded-[32px] border border-white/10">
          <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter leading-[1] mb-4">
            {study.tagline || study.title}
          </h3>
          <p className="text-white/60 text-[13px] lg:text-[14px] font-medium leading-relaxed max-w-md">
            {study.summary}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#37B4B4] text-[#082121] rounded-full px-8 py-4 lg:px-9 lg:py-4.5 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white group-hover:shadow-[#37B4B4]/20">
           <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Results</span>
           <div className="w-8 h-8 rounded-full bg-[#082121] flex items-center justify-center text-white">
             <ArrowUpRight size={16} />
           </div>
        </div>
      </div>
    </Link>
  );
}
