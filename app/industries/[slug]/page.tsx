"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button-cva";
import { industriesData } from "@/data/industries";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function IndustryPage({ params }: Props) {
  const resolvedParams = use(params);
  const industry = industriesData.find((i) => i.slug === resolvedParams.slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* 1. Hero Section - Deep Immersion */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-[#0E3E3E] text-white min-h-[70vh] flex flex-col justify-center overflow-hidden">
        {/* Background Layering */}
        <img src={industry.photo} alt={industry.name} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E3E3E] via-[#0E3E3E]/40 to-[#0E3E3E] z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <Link href="/industries" className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-xs mb-8 transition-colors backdrop-blur-md bg-white/5 px-4 py-2 rounded-lg border border-white/10 w-fit">
            <ArrowLeft size={16} />
            Back to Industries
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium mb-6 text-white/70">
            <span className="px-3 py-1 rounded-full bg-[#37B4B4]/20 text-[#37B4B4] uppercase tracking-wider">Industry Sector</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            <span className="text-white font-medium">{industry.name}</span>
          </div>
          <h1 className="text-3xl md:text-[3.5rem] font-medium tracking-tight mb-6 leading-[1.05] max-w-4xl uppercase">
            {industry.heroHeadline}
          </h1>
          <p className="text-base md:text-lg text-white/80 leading-relaxed font-light mb-10 max-w-2xl">
            {industry.shortDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={ChevronRight}
              iconPosition="end"
              className="shadow-lg shadow-[#37B4B4]/20"
            >
              {industry.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Problem vs Solution (Bento & Stepper) */}
      <section className="py-16 md:py-20 bg-[#F4FAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* The Problem (Bento Stack) */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <h2 className="text-[11px] font-medium tracking-widest text-[#37B4B4] uppercase mb-3">Sector Bottlenecks</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-[#082121] mb-6 leading-[1.15]">
                  What's holding {industry.name} back.
                </h3>
                
                <div className="grid gap-4">
                  {industry.challenges.map((pain, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                        <span className="text-red-500 font-medium text-base">✕</span>
                      </div>
                      <p className="text-[15px] md:text-base text-[#3a5a5a] leading-relaxed font-medium">{pain}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Solution (Vertical Stepper & ROI) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-[11px] font-medium tracking-widest text-[#37B4B4] uppercase mb-3">Strategic Interventions</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-[#082121] mb-8 leading-tight">
                  How AK Prime modernises {industry.name}.
                </h3>
                
                {/* Vertical Stepper Timeline */}
                <div className="relative border-l-2 border-gray-100 ml-4 pl-8 space-y-10 mb-12">
                   {industry.solutions.map((sol, idx) => (
                    <div key={idx} className="relative">
                      {/* Node */}
                      <div className="absolute -left-[2.8rem] w-10 h-10 bg-white border-2 border-[#37B4B4] rounded-full flex items-center justify-center shadow-md shadow-[#37B4B4]/20">
                        <span className="text-[#082121] font-medium text-sm">{idx + 1}</span>
                      </div>
                      <h4 className="text-lg md:text-xl text-[#082121] font-medium mb-2 transition-colors hover:text-[#37B4B4]">Phase {idx + 1} Modernisation</h4>
                      <p className="text-[15px] md:text-base text-[#3a5a5a] leading-relaxed">{sol}</p>
                    </div>
                   ))}
                </div>
                
                {/* Dark ROI Outcomes Container */}
                <div className="bg-[#082121] p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#37B4B4]/10 rounded-full blur-[100px] pointer-events-none" />
                   <h4 className="font-medium text-white text-lg md:text-xl mb-6 relative z-10 flex items-center gap-3">
                     <span className="w-2 h-2 bg-[#37B4B4] rounded-full animate-pulse"></span>
                     Sector Outcomes Expected
                   </h4>
                   <div className="space-y-4 relative z-10">
                     {industry.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#37B4B4] w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-white/90 font-medium text-[15px] md:text-base leading-snug">{outcome}</span>
                      </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Final CTA Banner */}
      <section className="py-20 bg-[#082121] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#37B4B4]/5 mix-blend-screen" />
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 leading-tight">
            Ready to lead the {industry.name} sector?
          </h2>
          <p className="text-lg text-white/70 mb-8 font-light">
            Partner with analysts and engineers who understand your specialized operational workflows.
          </p>
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            icon={ChevronRight}
            iconPosition="end"
          >
            {industry.cta}
          </Button>
        </div>
      </section>

    </div>
  );
}
