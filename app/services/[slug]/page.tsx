"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button-cva";
import { servicesData } from "@/data/services";
import { useSiteImage } from "@/lib/use-site-images";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ServicePage({ params }: Props) {
  const resolvedParams = use(params);
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);

  // Hook must run before any early return
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cmsPhoto = useSiteImage(service ? `service.${service.id}` : '')

  if (!service) {
    notFound();
  }

  const photo = cmsPhoto || service.photo;

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* 1. Hero */}
      <section
        className="relative flex flex-col justify-end overflow-hidden text-white"
        style={{ minHeight: "min(72vh, 560px)" }}
      >
        <img
          src={photo}
          alt={service.name}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          style={{ filter: "brightness(0.45) saturate(0.7)" }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.60) 50%, rgba(2,8,8,0.90) 100%)",
          }}
        />
        <div className="relative z-10 container-x pb-10 pt-6 sm:pb-14">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-[13px] font-normal transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Services
          </Link>
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 backdrop-blur-sm">
              {service.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/25" />
            <span className="text-[13px] text-white/65 font-normal">{service.name}</span>
          </div>
          <h1
            className="text-white font-medium text-balance mb-5 max-w-[22ch]"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            {service.heroHeadline}
          </h1>
          <p
            className="text-white/70 font-normal leading-relaxed mb-8 max-w-lg"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            {service.shortDescription}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-[#37B4B4] text-[#082121] text-[14px] font-semibold hover:bg-[#45cfcf] transition-colors shadow-[0_8px_32px_rgba(55,180,180,0.25)] whitespace-nowrap"
          >
            {service.cta}
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* 2. Problem vs Solution (Bento Grid Version) */}
      <section className="py-16 md:py-20 bg-[#F4FAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="section-overline mb-4">The challenge</h2>
            <h3 className="text-2xl md:text-4xl font-medium text-[#082121] leading-tight max-w-3xl">
              Why organizations struggle with {service.name}.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {service.painPoints.map((pain, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${idx === 2 ? 'md:col-span-1' : ''}`}
              >
                <div className="w-10 h-10 rounded-[12px] bg-red-50 flex items-center justify-center mb-5">
                  <span className="text-red-500 font-medium text-lg">✕</span>
                </div>
                <p className="text-base text-[#3a5a5a] leading-relaxed font-medium">{pain}</p>
              </div>
            ))}
          </div>

          {/* Solution Focus Container */}
          <div className="relative bg-[#082121] rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
            {/* Glass decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#37B4B4]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="section-overline mb-3">The AK Prime solution</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 leading-tight">
                  How we fix it permanently.
                </h3>
                <p className="text-lg text-white/80 leading-relaxed font-light">
                  {(() => {
                    const keywords = ["automated", "efficiency", "security", "real-time", "modernise", "compliance", "visibility", "ROI", "impact"];
                    return service.solution.split(" ").map((word, i) => {
                      const isKeyword = keywords.some(k => word.toLowerCase().includes(k.toLowerCase()));
                      return (
                        <span key={i} className={isKeyword ? "text-[#37B4B4] font-medium" : ""}>{word}{" "}</span>
                      );
                    });
                  })()}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-7 rounded-2xl">
                 <h4 className="font-medium text-white text-base mb-5">Tangible outcomes expected:</h4>
                 <div className="space-y-4">
                   {service.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#37B4B4]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="text-[#37B4B4] w-4 h-4" />
                      </div>
                      <span className="text-white/90 font-medium text-base leading-snug">{outcome}</span>
                    </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Implementation Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
             <h2 className="section-overline mb-4">Our approach</h2>
             <h3 className="text-2xl md:text-4xl font-medium text-[#082121] leading-tight mb-5">
               How we deliver {service.name}.
             </h3>
             <p className="text-lg text-[#3a5a5a] leading-relaxed">
               We utilize a rigorous, structured methodology to ensure your engagement is delivered on time, securely, and with zero business disruption.
             </p>
           </div>

           <div className="relative">
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {service.process.map((step, idx) => (
                  <div key={idx} className="relative z-10 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 bg-[#37B4B4]/15 border border-[#37B4B4]/30 text-[#37B4B4] font-semibold text-base transition-all duration-300 group-hover:bg-[#37B4B4]/30 relative shadow-xl shadow-[#37B4B4]/5">
                       <div className="absolute inset-2 bg-[#37B4B4]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                       <span className="relative z-10">
                         {idx + 1}
                       </span>
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-lg md:text-xl font-medium text-[#082121] mb-2 group-hover:text-[#37B4B4] transition-colors">{step.title}</h4>
                      <p className="text-base text-[#3a5a5a] leading-relaxed">
                        {(() => {
                          const keywords = ["rigorous", "structured", "zero disruption", "securely", "on time", "adoption", "transition"];
                          return step.desc.split(" ").map((word, i) => {
                            const isKeyword = keywords.some(k => word.toLowerCase().includes(k.toLowerCase()));
                            return (
                              <span key={i} className={isKeyword ? "text-[#082121] font-medium" : ""}>{word}{" "}</span>
                            );
                          });
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* 4. Final CTA Banner */}
      <section className="py-24 bg-[#082121] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#37B4B4]/5 mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#37B4B4]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="cta-glow-bg" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight">
            Ready to transform your {service.name}?
          </h2>
          <div className="flex flex-col items-center gap-3 mb-10">
            <p className="text-white/50 text-sm">Deploy tools built for enterprise scale</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {service.tools.split('·').map(t => <span key={t} className="pill-g">{t.trim()}</span>)}
            </div>
          </div>
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            icon={ChevronRight}
            iconPosition="end"
            className="shadow-xl shadow-[#37B4B4]/20"
          >
            {service.cta}
          </Button>
        </div>
      </section>

    </div>
  );
}
