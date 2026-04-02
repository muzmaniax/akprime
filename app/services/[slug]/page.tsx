import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { servicesData } from "@/data/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);
  
  if (!service) {
    return { title: "Service Not Found | AK Prime Consulting" };
  }

  return {
    title: `${service.name} | Services | AK Prime Consulting`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = servicesData.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      
      {/* 1. Hero Section (The Hook) - Glassmorphism Edit */}
      <section className="relative pt-14 pb-20 md:pt-20 md:pb-28 bg-[#0E3E3E] text-white overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#37B4B4]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#29E0C8]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 bg-[#082121]/60 mix-blend-multiply pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Link href="/services" className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm mb-8 transition-colors backdrop-blur-md bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <ArrowLeft size={16} />
              Back to Services Directory
            </Link>
            <div className="flex flex-wrap items-center gap-2 mb-6 text-xs md:text-sm font-medium">
              <Link href="/services" className="pill-a inline-flex">
                {service.category.split(" & ")[0]}
              </Link>
              <span className="pill-a inline-flex">
                {service.name}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1]">
              {service.heroHeadline}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light mb-8 max-w-xl">
              {service.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="pill-e cta-pulse shadow-lg shadow-[#37B4B4]/20">
                <div className="pill-e-group">
                  {service.cta}
                  <div className="pill-e-icon">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#37B4B4]/30 to-transparent rounded-3xl md:-translate-x-6 md:translate-y-6 blur-md" />
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
               <div className="absolute inset-0 bg-[#37B4B4]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
               <img 
                 src={service.photo} 
                 alt={service.name} 
                 className="w-full h-[550px] object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
               />
             </div>
          </div>
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
                  <span className="text-red-500 font-bold text-lg">✕</span>
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
          <Link href="/contact" className="pill-e cta-pulse shadow-xl shadow-[#37B4B4]/20">
            <div className="pill-e-group">
              {service.cta}
              <div className="pill-e-icon">
                <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
