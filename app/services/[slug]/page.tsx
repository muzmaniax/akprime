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
      <section className="relative pt-32 pb-28 md:pt-48 md:pb-40 bg-[#0E3E3E] text-white overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#37B4B4]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#29E0C8]/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="absolute inset-0 bg-[#082121]/60 mix-blend-multiply pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Link href="/services" className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm mb-8 transition-colors backdrop-blur-md bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <ArrowLeft size={16} />
              Back to Services Directory
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium mb-6 text-white/70">
              <span className="px-3 py-1 rounded-full bg-[#37B4B4]/20 text-[#37B4B4] uppercase tracking-wider">{service.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
              <span className="text-white font-bold">{service.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              {service.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-10 max-w-xl">
              {service.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center bg-[#37B4B4] text-[#082121] hover:bg-[#29E0C8] px-8 h-14 rounded-xl font-bold text-lg transition-colors cta-pulse shadow-lg shadow-[#37B4B4]/20">
                {service.cta}
                <ChevronRight size={20} className="ml-2" />
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
      <section className="py-24 md:py-32 bg-[#F4FAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-sm font-bold tracking-widest text-[#37B4B4] uppercase mb-4">The Challenge</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#082121] leading-tight max-w-3xl">
              Why organizations struggle with {service.name}.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {service.painPoints.map((pain, idx) => (
              <div 
                key={idx} 
                className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${idx === 2 ? 'md:col-span-1' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
                  <span className="text-red-500 font-bold text-xl">✕</span>
                </div>
                <p className="text-lg text-[#3a5a5a] leading-relaxed font-medium">{pain}</p>
              </div>
            ))}
          </div>

          {/* Solution Focus Container */}
          <div className="relative bg-[#082121] rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
            {/* Glass decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#37B4B4]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-[#37B4B4] uppercase mb-4">The AK Prime Solution</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
                  How we fix it permanently.
                </h3>
                <p className="text-xl text-white/80 leading-relaxed font-light">
                  {service.solution}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
                 <h4 className="font-bold text-white text-lg mb-6">Tangible Outcomes Expected:</h4>
                 <div className="space-y-5">
                   {service.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#37B4B4]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="text-[#37B4B4] w-5 h-5" />
                      </div>
                      <span className="text-white/90 font-medium text-lg leading-snug">{outcome}</span>
                    </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Implementation Process */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
             <h2 className="text-sm font-bold tracking-widest text-[#37B4B4] uppercase mb-4">Our Approach</h2>
             <h3 className="text-3xl md:text-5xl font-bold text-[#082121] leading-tight mb-6">
               How we deliver {service.name}.
             </h3>
             <p className="text-xl text-[#3a5a5a] leading-relaxed">
               We utilize a rigorous, structured methodology to ensure your engagement is delivered on time, securely, and with zero business disruption.
             </p>
           </div>

           <div className="relative">
              {/* Connector line for desktop */}
              <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-[#37B4B4]/20" />
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {service.process.map((step, idx) => (
                  <div key={idx} className="relative z-10 group">
                    <div className="w-16 h-16 bg-white border-4 border-[#F4FAFA] group-hover:border-[#37B4B4]/30 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-xl shadow-[#37B4B4]/5 transition-all duration-300 relative">
                       <div className="absolute inset-2 bg-[#37B4B4]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                       <span className="text-[#082121] group-hover:text-[#37B4B4] font-bold text-xl relative z-10 transition-colors">
                         {idx + 1}
                       </span>
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-xl md:text-2xl font-bold text-[#082121] mb-3 group-hover:text-[#37B4B4] transition-colors">{step.title}</h4>
                      <p className="text-lg text-[#3a5a5a] leading-relaxed">{step.desc}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to transform your {service.name}?
          </h2>
          <p className="text-xl text-white/70 mb-10 font-light">
            Deploy tools built for pan-African enterprise scale: {service.tools}
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-[#37B4B4] text-[#082121] hover:bg-[#29E0C8] px-10 h-16 rounded-xl font-bold text-lg transition-colors cta-pulse shadow-xl shadow-[#37B4B4]/20">
            {service.cta}
          </Link>
        </div>
      </section>

    </div>
  );
}
