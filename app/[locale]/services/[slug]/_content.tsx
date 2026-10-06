"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button-cva";
import { getLocalizedServiceBySlug } from "@/lib/i18n/localized-data";
import { useI18n } from "@/lib/i18n/context";
import { useSiteImage } from "@/lib/use-site-images";

export function ServicePageContent({ slug }: { slug: string }) {
  const { locale, dir } = useI18n();
  const isAr = locale === "ar";
  const service = getLocalizedServiceBySlug(slug, locale);
  const cmsPhoto = useSiteImage(service ? `service.${service.id}` : "");

  if (!service) notFound();

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
            href={`/${locale}/services`}
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-[13px] font-normal transition-colors mb-8"
          >
            <ArrowLeft size={14} strokeWidth={2} className="rtl-mirror" />
            {isAr ? "العودة إلى الخدمات" : "Back to Services"}
          </Link>
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/80 backdrop-blur-sm">
              {service.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/25" />
            <span className="text-[13px] text-white/65 font-normal">{service.name}</span>
          </div>
          <h1
            className="text-white font-medium text-balance mb-5 max-w-[24ch]"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)", lineHeight: 1.15, letterSpacing: isAr ? "normal" : "-0.025em" }}
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
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-[#37B4B4] text-[#082121] text-[14px] font-semibold hover:bg-[#45cfcf] transition-colors shadow-[0_8px_32px_rgba(55,180,180,0.25)] whitespace-nowrap"
          >
            {service.cta}
            <ArrowUpRight size={15} strokeWidth={2.5} className="rtl-mirror" />
          </Link>
        </div>
      </section>

      {/* 2. Problem vs Solution */}
      <section className="py-16 md:py-20 bg-[#F4FAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="section-overline mb-4">{isAr ? "التحدي التشغيلي" : "The challenge"}</h2>
            <h3 className="text-2xl md:text-4xl font-medium text-[#082121] leading-tight max-w-3xl">
              {isAr ? `أبرز العقبات التي تواجه المؤسسات في مجال ${service.name}.` : `Why organizations struggle with ${service.name}.`}
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {service.painPoints.map((pain, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-[#082121]/8 hover:border-[#082121]/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${idx === 2 ? "md:col-span-1" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
                  <span className="text-red-500 font-semibold text-base leading-none">✕</span>
                </div>
                <p className="text-[14px] sm:text-[15px] text-[#3a5a5a] leading-relaxed font-medium">{pain}</p>
              </div>
            ))}
          </div>
          <div className="relative bg-[#082121] rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#37B4B4]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="section-overline mb-3">{isAr ? "حلول إيه كي برايم المتكاملة" : "The AK Prime solution"}</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-6 leading-tight">
                  {isAr ? "معالجة جذرية ومستدامة لأسباب الخلل." : "How we fix it permanently."}
                </h3>
                <p className="text-lg text-white/80 leading-relaxed font-light">
                  {service.solution}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-7 rounded-2xl">
                <h4 className="font-medium text-white text-base mb-5">
                  {isAr ? "المخرجات والنتائج الملموسة المتوقعة:" : "Tangible outcomes expected:"}
                </h4>
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
            <h2 className="section-overline mb-4">{isAr ? "منهجية العمل" : "Our approach"}</h2>
            <h3 className="text-2xl md:text-4xl font-medium text-[#082121] leading-tight mb-5">
              {isAr ? `كيف ننفذ خدمات ${service.name}.` : `How we deliver ${service.name}.`}
            </h3>
            <p className="text-lg text-[#3a5a5a] leading-relaxed">
              {isAr
                ? "نطبق منهجية مرحلية صارمة تضمن تسليم العمل في وقته المحدد وبأعلى معايير الأمان مع ضمان استمرارية الأعمال دون انقطاع."
                : "We utilize a rigorous, structured methodology to ensure your engagement is delivered on time, securely, and with zero business disruption."}
            </p>
          </div>
          <div
            className={`grid sm:grid-cols-2 ${
              service.process.length === 3
                ? "lg:grid-cols-3 max-w-5xl mx-auto"
                : service.process.length === 2
                ? "lg:grid-cols-2 max-w-3xl mx-auto"
                : "lg:grid-cols-4"
            } gap-5 lg:gap-6`}
          >
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-[#F8FCFC] hover:bg-white rounded-2xl p-6 sm:p-7 border border-[#082121]/8 hover:border-[#37B4B4]/40 hover:shadow-[0_12px_32px_rgba(8,33,33,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-[#37B4B4]/15 border border-[#37B4B4]/30 text-[#37B4B4] font-semibold text-xs tracking-wider uppercase group-hover:bg-[#37B4B4] group-hover:text-[#082121] transition-all">
                      <bdi className="ltr-isolate">0{idx + 1}</bdi>
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider text-[#082121]/35 uppercase">
                      {isAr ? `المرحلة 0${idx + 1}` : `Phase 0${idx + 1}`}
                    </span>
                  </div>
                  <h4 className="text-[17px] sm:text-[18px] font-semibold text-[#082121] mb-2.5 group-hover:text-[#137a7a] transition-colors leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-[13.5px] text-[#3a5a5a] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#082121]/5 flex items-center justify-between text-[12px] text-[#37B4B4] font-medium">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {isAr ? "تنفيذ منضبط" : "Structured delivery"}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]/30 group-hover:bg-[#37B4B4] transition-colors" />
                </div>
              </div>
            ))}
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
            {isAr ? `جاهز لتطوير وإعادة هيكلة ${service.name}؟` : `Ready to transform your ${service.name}?`}
          </h2>
          <div className="flex flex-col items-center gap-3 mb-10">
            <p className="text-white/50 text-sm">
              {isAr ? "أدوات وتقنيات معتمدة على مستوى المؤسسات الكبرى" : "Deploy tools built for enterprise scale"}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {service.tools.split("·").map(t => (
                <span key={t} className="pill-g">
                  <bdi className="ltr-isolate">{t.trim()}</bdi>
                </span>
              ))}
            </div>
          </div>
          <Button
            href={`/${locale}/contact`}
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
