"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useI18n } from "@/lib/i18n/context";

export function ChallengeSection({ onBooking }: { onBooking: () => void }) {
  const { locale, isRTL, t } = useI18n();

  const mainPoints =
    locale === "ar"
      ? [
          "التقارير المالية تستغرق أسابيع بدلاً من ساعات",
          "العمليات تعتمد على أدوات قديمة ومعزولة",
          "الفرق تعمل بمعزل عن بعضها ودون بيانات موحدة",
          "القرارات تُبنى على التخمين لا على التحليلات الدقيقة",
        ]
      : [
          "Financial reports take weeks- not hours",
          "Operations run on outdated, siloed tools",
          "Teams work in isolation instead of shared data",
          "Decisions are based on guesswork, not intelligence",
        ];

  const currentStatePoints =
    locale === "ar"
      ? [
          "تأخر التقارير المالية",
          "إدخال البيانات يدوياً",
          "أدوات وبرمجيات مشتتة",
          "تسرب الإيرادات غير الملحوظ",
        ]
      : [
          "Financial reporting delayed",
          "Manual data entry",
          "Disconnected tools",
          "Hidden revenue leakage",
        ];

  const futureStatePoints =
    locale === "ar"
      ? [
          "رؤية مالية لحظية وشاملة",
          "تدفقات عمل مؤتمتة",
          "أنظمة مترابطة ومتكاملة",
          "اتخاذ قرارات سريعة ودقيقة",
        ]
      : [
          "Real-time financial visibility",
          "Automated workflows",
          "Connected systems",
          "Faster decision making",
        ];

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <ScrollReveal>
            <div className="max-w-[500px]">
              <div className="inline-flex items-center px-3 py-2 rounded-full bg-[#20beb321] border border-[#137a7a80] mb-6">
                <span className="text-[#137a7a] text-sm font-medium tracking-tight">
                  {t.challenge.overline}
                </span>
              </div>

              <h2 className="text-[34px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.15] tracking-[-0.03em] text-black mb-6">
                {t.challenge.title}
              </h2>

              <p className="text-lg lg:text-[20px] leading-[1.4] tracking-[-0.02em] text-[#252525] mb-8">
                {t.challenge.subtitle}
              </p>

              <ul className="space-y-4 mb-10">
                {mainPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#252525] mt-2.5 shrink-0" />
                    <span className="text-base lg:text-[18px] font-light leading-[1.35] tracking-[-0.02em] text-[#252525]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={onBooking}
                className="group flex items-center gap-3 px-4 py-2 rounded-full bg-[#32c4c4] border border-[#137a7a80] hover:bg-[#2bb2b2] transition-colors cursor-pointer"
              >
                <span className="text-[14px] sm:text-[15px] font-medium text-[#181818] tracking-tight">
                  {t.challenge.cta}
                </span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0e3e3e]">
                  <ArrowRight
                    size={16}
                    className="text-[#32c4c4] transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl-mirror transition-transform"
                  />
                </div>
              </button>
            </div>
          </ScrollReveal>

          {/* Right Cards */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Current State Card */}
              <div className="w-full sm:w-[364px] h-[483px] bg-white border border-[#790000c9] rounded-[28px] overflow-hidden p-4 flex flex-col shadow-xl">
                <div className="relative h-[264px] rounded-[10px] overflow-hidden border border-[#950202] mb-6">
                  <Image
                    src="/stressed_office_chaos_1777371140323.png"
                    alt={
                      locale === "ar"
                        ? "بيئة عمل مشتتة وجداول بيانات معقدة"
                        : "Stressed office with chaotic spreadsheets"
                    }
                    fill
                    className="object-cover grayscale-[0.2]"
                    sizes="(max-width: 640px) 100vw, 364px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Declining Arrow Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 opacity-80 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-auto text-[#c93b3b]">
                      <path
                        d="M10 20 L40 50 L60 40 L90 80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M75 80 L90 80 L90 65"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="absolute bottom-4 inset-x-4">
                    <h3 className="text-[32px] sm:text-[38px] font-bold text-white tracking-[-0.04em] leading-none drop-shadow-lg">
                      {locale === "ar" ? "الوضع الراهن" : "Current State"}
                    </h3>
                  </div>
                </div>

                <div className="flex-1 flex flex-col px-1">
                  <h4 className="text-[20px] sm:text-[23px] font-medium tracking-tight text-[#252525] mb-2 leading-tight">
                    {locale === "ar" ? "أين تتعطل العمليات؟" : "Where operations break down"}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#252525] mb-4 leading-normal opacity-80">
                    {t.challenge.fragmentedDesc}
                  </p>
                  <ul className="space-y-1.5 mt-auto pb-4">
                    {currentStatePoints.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c93b3b] shrink-0" />
                        <span className="text-[14px] text-[#c93b3b] tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Future State Card */}
              <div className="w-full sm:w-[364px] h-[483px] bg-[#0c3535] border border-[#ff707040] rounded-[25px] overflow-hidden p-4 flex flex-col shadow-2xl relative">
                <div className="relative h-[264px] rounded-[10px] overflow-hidden border border-[#0c7979] shadow-[0_0_17px_2px_rgba(32,190,179,0.21)] mb-6">
                  <Image
                    src="/happy_modern_office_1777371160334.png"
                    alt={
                      locale === "ar"
                        ? "بيئة عمل حديثة وموحدة بالأنظمة الذكية"
                        : "Happy modern office with unified systems"
                    }
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 364px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c3535]/90 via-[#0c3535]/40 to-transparent" />

                  {/* Increasing Arrow Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 opacity-40 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-auto text-[#93ffff]">
                      <path
                        d="M10 80 L40 50 L60 60 L90 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M75 20 L90 20 L90 35"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="absolute bottom-4 inset-x-4">
                    <h3 className="text-[32px] sm:text-[38px] font-bold text-white tracking-[-0.04em] leading-none drop-shadow-2xl">
                      {locale === "ar" ? "المنظومة الموحدة" : "Future State"}
                    </h3>
                  </div>
                </div>

                <div className="flex-1 flex flex-col px-1">
                  <h4 className="text-[20px] sm:text-[23px] font-medium tracking-tight text-[#93ffff] mb-2 leading-tight">
                    {locale === "ar" ? "ما الذي يتغير مع الأنظمة؟" : "What changes with systems?"}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 mb-4 leading-normal">
                    {t.challenge.unifiedDesc}
                  </p>
                  <ul className="space-y-1.5 mt-auto pb-4">
                    {futureStatePoints.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                        <span className="text-[14px] text-white tracking-tight">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Icon Overlay for Premium feel */}
                  <div className="absolute bottom-4 ltr:right-4 rtl:left-4 opacity-70 pointer-events-none">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="30"
                        cy="30"
                        r="28"
                        stroke="#93ffff"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                      />
                      <path d="M30 15V45M15 30H45" stroke="#93ffff" strokeWidth="0.5" opacity="0.3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
