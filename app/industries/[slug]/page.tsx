import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { industriesData } from "@/data/industries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const industry = industriesData.find((i) => i.slug === resolvedParams.slug);
  
  if (!industry) {
    return { title: "Industry Not Found | AK Prime Consulting" };
  }

  return {
    title: `${industry.name} Industry Solutions | AK Prime Consulting`,
    description: industry.shortDescription,
  };
}

export default async function IndustryPage({ params }: Props) {
  const resolvedParams = await params;
  const industry = industriesData.find((i) => i.slug === resolvedParams.slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* 1. Hero Section - Deep Immersion */}
      <section className="relative pt-32 pb-32 md:pt-56 md:pb-48 bg-[#0E3E3E] text-white min-h-[85vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#082121]/90 mix-blend-multiply pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E3E3E] via-transparent to-[#0E3E3E] z-10 opacity-80" />
        <img src={industry.photo} alt={industry.name} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay scale-105" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <Link href="/industries" className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm mb-10 transition-colors backdrop-blur-md bg-white/5 px-4 py-2 rounded-lg border border-white/10 w-fit">
            <ArrowLeft size={16} />
            Back to Industries
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium mb-6 text-white/70">
            <span className="px-3 py-1 rounded-full bg-[#37B4B4]/20 text-[#37B4B4] uppercase tracking-wider">Industry Sector</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            <span className="text-white font-bold">{industry.name}</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05] max-w-5xl">
            {industry.heroHeadline}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-12 max-w-3xl">
            {industry.shortDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-[#37B4B4] text-[#082121] hover:bg-[#29E0C8] px-10 h-16 rounded-xl font-bold text-lg transition-colors shadow-2xl shadow-[#37B4B4]/20 cta-pulse">
              {industry.cta}
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem vs Solution (Bento & Stepper) */}
      <section className="py-24 md:py-32 bg-[#F4FAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* The Problem (Bento Stack) */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <h2 className="text-sm font-bold tracking-widest text-[#37B4B4] uppercase mb-4">Sector Bottlenecks</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-[#082121] mb-10 leading-tight">
                  What's holding {industry.name} back.
                </h3>
                
                <div className="grid gap-5">
                  {industry.challenges.map((pain, idx) => (
                    <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                        <span className="text-red-500 font-bold text-lg">✕</span>
                      </div>
                      <p className="text-lg text-[#3a5a5a] leading-relaxed font-medium">{pain}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Solution (Vertical Stepper & ROI) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-xl border border-gray-100">
                <h2 className="text-sm font-bold tracking-widest text-[#37B4B4] uppercase mb-4">Strategic Interventions</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-[#082121] mb-12 leading-tight">
                  How AK Prime modernises {industry.name}.
                </h3>
                
                {/* Vertical Stepper Timeline */}
                <div className="relative border-l-2 border-gray-100 ml-6 pl-10 space-y-12 mb-16">
                   {industry.solutions.map((sol, idx) => (
                    <div key={idx} className="relative">
                      {/* Node */}
                      <div className="absolute -left-[3.25rem] w-12 h-12 bg-white border-[3px] border-[#37B4B4] rounded-full flex items-center justify-center shadow-lg shadow-[#37B4B4]/20">
                        <span className="text-[#082121] font-bold">{idx + 1}</span>
                      </div>
                      <h4 className="text-xl text-[#082121] font-bold mb-3 transition-colors hover:text-[#37B4B4]">Phase {idx + 1} Modernisation</h4>
                      <p className="text-lg text-[#3a5a5a] leading-relaxed">{sol}</p>
                    </div>
                   ))}
                </div>
                
                {/* Dark ROI Outcomes Container */}
                <div className="bg-[#082121] p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#37B4B4]/10 rounded-full blur-[80px] pointer-events-none" />
                   <h4 className="font-bold text-white text-xl mb-6 relative z-10 flex items-center gap-3">
                     <span className="w-2 h-2 bg-[#37B4B4] rounded-full animate-pulse"></span>
                     Sector Outcomes Expected
                   </h4>
                   <div className="space-y-4 relative z-10">
                     {industry.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <CheckCircle2 className="text-[#37B4B4] w-6 h-6 shrink-0 mt-0.5" />
                        <span className="text-white/90 font-medium text-lg leading-snug">{outcome}</span>
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
      <section className="py-24 bg-[#082121] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#37B4B4]/5 mix-blend-screen" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to lead the {industry.name} sector?
          </h2>
          <p className="text-xl text-white/70 mb-10 font-light">
            Partner with analysts and engineers who understand your specialized operational workflows.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#37B4B4] text-[#082121] hover:bg-[#29E0C8] px-10 h-16 rounded-xl font-bold text-lg transition-colors cta-pulse">
            {industry.cta}
          </Link>
        </div>
      </section>

    </div>
  );
}
