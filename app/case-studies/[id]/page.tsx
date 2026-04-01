"use client";

import { use, useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { BookingModal } from "@/components/ui/BookingModal";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function CaseStudyDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const study = caseStudies.find(s => s.id === resolvedParams.id);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!study) return notFound();

  return (
    <main className="bg-[#F4FAFA] min-h-screen font-sans selection:bg-[#37B4B4]/30 selection:text-[#37B4B4] pb-24 overflow-x-hidden">
      {/* Back Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#082121]/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link 
            href="/case-studies" 
            className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#082121]/40 hover:text-[#37B4B4] transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>
          <div className="hidden sm:flex items-center gap-4">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#37B4B4] font-mono">{study.industry}</span>
               <span className="w-1 h-1 rounded-full bg-[#082121]/10" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#082121]/40 font-mono">{study.solution}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-[#082121]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-4xl">
              <h1 className="text-4xl lg:text-7xl font-black text-[#082121] uppercase tracking-tighter leading-[0.95] mb-10">
                {study.title}
              </h1>
              <div className="flex flex-wrap gap-8 text-[11px] uppercase font-bold tracking-[0.2em] text-[#082121]/40 font-mono">
                <div className="space-y-1">
                  <div className="text-[#37B4B4]">Client</div>
                  <div className="text-[#082121]">{study.client}</div>
                </div>
                <div className="w-px h-8 bg-[#082121]/10 hidden sm:block" />
                <div className="space-y-1">
                  <div className="text-[#37B4B4]">Industry</div>
                  <div className="text-[#082121]">{study.industry}</div>
                </div>
                <div className="w-px h-8 bg-[#082121]/10 hidden sm:block" />
                <div className="space-y-1">
                  <div className="text-[#37B4B4]">Region</div>
                  <div className="text-[#082121]">{study.location}</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="pt-16 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-24">
          
          {/* Sidebar */}
          <aside className="space-y-10">
            <div className="p-8 lg:p-10 bg-white rounded-3xl border border-[#082121]/5 shadow-sm space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#37B4B4]/20" />
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#082121]/30 font-mono">Service:</h5>
                <p className="text-lg font-black text-[#082121] uppercase tracking-tight leading-tight">{study.solution}</p>
              </div>
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#082121]/30 font-mono">Client:</h5>
                <p className="text-lg font-black text-[#082121] uppercase tracking-tight leading-tight">{study.client}</p>
              </div>
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#082121]/30 font-mono">Duration:</h5>
                <p className="text-lg font-black text-[#082121] uppercase tracking-tight leading-tight">{study.duration}</p>
              </div>
              <div className="space-y-2">
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#082121]/30 font-mono">Completion:</h5>
                <p className="text-lg font-black text-[#082121] uppercase tracking-tight leading-tight">{study.date}</p>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl border border-white/80 group">
              <img 
                src={study.testimonial.image} 
                alt={study.testimonial.name}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#082121]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-8 bg-white/10 backdrop-blur-3xl rounded-[24px] border border-white/20 shadow-2xl">
                 <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h6 className="text-[13px] font-black text-white tracking-tight uppercase leading-none mb-1">{study.testimonial.name}</h6>
                      <p className="text-[9px] font-bold text-[#37B4B4] uppercase tracking-widest font-mono">{study.testimonial.role}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#082121]">
                      <ArrowUpRight size={14} />
                    </div>
                 </div>
                 <p className="text-white/80 text-[12px] font-bold leading-relaxed tracking-tight line-clamp-3">
                   "{study.testimonial.quote}"
                 </p>
              </div>
            </div>

            <button onClick={() => setBookingOpen(true)} className="w-full bg-[#082121] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden relative group">
              <div className="absolute inset-0 bg-[#37B4B4] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-[#082121] transition-colors">Start Assessment</span>
            </button>
          </aside>

          {/* Body */}
          <div className="space-y-20 lg:space-y-32">
            <ScrollReveal>
              <section className="space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#37B4B4] font-mono">THE CHALLENGE</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-[#082121] uppercase tracking-tighter leading-[0.95] max-w-3xl">
                  Disrupting Inefficiency with Unified Systems.
                </h2>
                <p className="text-lg lg:text-xl text-[#082121]/60 leading-relaxed font-medium max-w-2xl">
                  {study.narrative.problem}
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <section className="space-y-20">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-[#37B4B4]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#37B4B4] font-mono">The Approach</span>
                </div>
                <div className="space-y-10 lg:space-y-12">
                   {study.narrative.approach.map((step, idx) => (
                      <div key={idx} className="space-y-4">
                         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#082121]/5 border border-[#082121]/10">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#082121]/40 font-mono leading-none pt-[1px]">
                             0{idx + 1} // {step.title}
                           </span>
                         </div>
                         <div className="space-y-4">
                            <p className="text-2xl lg:text-4xl text-[#082121] font-black uppercase tracking-tighter leading-[0.9] max-w-2xl">
                              {step.description}
                            </p>
                            <ul className="space-y-2">
                               {step.points.map((p, pIdx) => (
                                 <li key={pIdx} className="flex gap-4 items-start text-sm lg:text-base font-bold text-[#082121]/60 leading-relaxed max-w-2xl">
                                    <div className="mt-2 w-1 h-1 rounded-full bg-[#37B4B4] shrink-0" />
                                    {p}
                                 </li>
                               ))}
                            </ul>
                         </div>
                      </div>
                   ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Results Section - Redone & Wider */}
      <section className="mt-32 lg:mt-56 relative border-y border-[#082121]/5 overflow-hidden">
         <div className="bg-[#082121] py-32 lg:py-48 px-4 sm:px-6 lg:px-8 relative">
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 p-32 text-[#37B4B4]/5 pointer-events-none">
              <CheckCircle2 size={500} strokeWidth={0.2} />
            </div>

            <div className="max-w-7xl mx-auto mb-24 relative z-10">
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 mb-12">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#37B4B4] font-mono">THE QUANTIFIED OUTCOME</span>
               </div>
               <h2 className="text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] max-w-4xl">
                 {study.narrative.outcome}
               </h2>
            </div>

            {/* Stats Ticker / Wide Row */}
            <div className="relative -mx-4 sm:-mx-6 lg:-mx-[calc((100vw-min(1280px,100%))/2)] w-screen overflow-hidden py-12 border-t border-b border-white/10 group">
               <div className="flex gap-20 lg:gap-32 px-20">
                  <div className="flex gap-20 lg:gap-40 animate-ticker grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
                    {/* Double mapping for seamless scroll if needed, but here we just showcase it as a list first */}
                    {[...study.metrics, ...study.metrics].map((m, idx) => (
                      <div key={idx} className="shrink-0 space-y-4">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: (idx % study.metrics.length) * 0.1 }}
                          className="text-6xl lg:text-[160px] font-black text-[#37B4B4] tracking-tighter leading-none"
                        >
                          {m.value}
                        </motion.div>
                        <div className="text-[12px] font-black uppercase tracking-[0.4em] text-white/30 font-mono pl-2">{m.label}</div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            <div className="max-w-7xl mx-auto mt-24 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
               <div className="flex items-center gap-10">
                  <div className="w-16 h-16 rounded-full bg-[#37B4B4]/10 border border-[#37B4B4]/20 flex items-center justify-center text-[#37B4B4]">
                    <Zap size={32} />
                  </div>
                  <div className="space-y-1">
                    <h6 className="text-white font-black uppercase text-sm tracking-widest">Drive similar impact</h6>
                    <p className="text-white/40 text-[12px] font-bold tracking-tight uppercase leading-relaxed max-w-sm">
                      Our transformation frameworks are sector-agnostic and outcome-driven.
                    </p>
                  </div>
               </div>
               <button onClick={() => setBookingOpen(true)} className="w-full md:w-auto bg-[#37B4B4] text-[#082121] px-14 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-[#37B4B4]/20">
                 Book Discovery Session
               </button>
            </div>
         </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </main>
  );
}
