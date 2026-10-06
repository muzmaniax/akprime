"use client";

import Link from "next/link";
import { ArrowUpRight, Cpu, Shield, BarChart3, Users, TrendingUp } from "lucide-react";
import { Reveal, Eyebrow, StaggerReveal } from "@/components/ui/Primitives";
import { servicesData, type ServiceCategory } from "@/data/services";
import { useI18n } from "@/lib/i18n/context";

type ServiceItem = {
  key: ServiceCategory;
  icon: React.ElementType;
  headlineEn: string;
  headlineAr: string;
  blurbEn: string;
  blurbAr: string;
};

const SERVICES: ServiceItem[] = [
  {
    key: "Systems & Technology",
    icon: Cpu,
    headlineEn: "Systems & Technology",
    headlineAr: "الأنظمة والتقنية",
    blurbEn:
      "ERP implementation, AI integration, and digital transformation. We replace fragmented tools with unified, scalable operating platforms.",
    blurbAr:
      "تطبيق أنظمة تخطيط الموارد (ERP)، تكامل الذكاء الاصطناعي، والتحول الرقمي. نستبدل الأدوات المتفرقة بمنصات تشغيل موحدة وقابلة للتوسع.",
  },
  {
    key: "Finance & Compliance",
    icon: Shield,
    headlineEn: "Finance & Compliance",
    headlineAr: "المالية والامتثال",
    blurbEn:
      "CFO advisory, FP&A modelling, audit frameworks and regulatory readiness, built for organisations that need rigour without the overhead.",
    blurbAr:
      "استشارات الإدارة المالية، نمذجة التخطيط والتحليل المالي (FP&A)، وأطر التدقيق والجاهزية التنظيمية لدقة وانضباط مالي متكامل.",
  },
  {
    key: "Strategy & Transformation",
    icon: BarChart3,
    headlineEn: "Strategy & Transformation",
    headlineAr: "الاستراتيجية والتحول",
    blurbEn:
      "Governance design, business analysis, and capital readiness strategies that turn complex decisions into executable plans.",
    blurbAr:
      "تصميم الحوكمة، تحليل الأعمال وإعادة هندسة العمليات، واستراتيجيات الجاهزية الاستثمارية لتحويل القرارات المعقدة إلى خطط قابلة للتنفيذ.",
  },
  {
    key: "HR & People Services",
    icon: Users,
    headlineEn: "HR & People Services",
    headlineAr: "الموارد البشرية والكوادر",
    blurbEn:
      "Organisation design, payroll, recruitment, and L&D, integrated into one people platform that actually works at scale.",
    blurbAr:
      "التصميم التنظيمي، إدارة الرواتب، استقطاب الكفاءات، والتعلم والتطوير، ضمن منظومة موارد بشرية موحدة تلبي متطلبات التوسع.",
  },
  {
    key: "Growth & Impact",
    icon: TrendingUp,
    headlineEn: "Growth & Impact",
    headlineAr: "النمو والأثر المؤسسي",
    blurbEn:
      "Brand strategy, performance marketing, and impact frameworks calibrated to your business model and growth stage.",
    blurbAr:
      "استراتيجيات العلامة التجارية، التسويق الرقمي للأداء، وأطر قياس الأثر الموجهة لنموذج عملك ومرحلة نموك.",
  },
];

export function ServicesSection() {
  const { locale, isRTL, t } = useI18n();
  const totalCount = servicesData.length;

  return (
    <section className="bg-white section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <Reveal>
              <Eyebrow>{t.servicesSection.overline}</Eyebrow>
              <h2 className="mt-3 text-[#082121] text-balance max-w-[26ch] text-[28px] sm:text-[34px] lg:text-[40px] font-medium leading-tight">
                {locale === "ar" ? (
                  <>
                    {totalCount} مسار خدمة متكامل.<br className="hidden sm:block" /> خمسة مجالات خبرة. فريق استشاري واحد.
                  </>
                ) : (
                  <>
                    {totalCount} service lines.<br className="hidden sm:block" /> Five practice areas. One team.
                  </>
                )}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#37B4B4] hover:text-[#082121] transition-colors"
              >
                <span>
                  {locale === "ar"
                    ? `عرض كافة الخدمات الـ ${totalCount}`
                    : `View all ${totalCount} services`}
                </span>
                <ArrowUpRight size={14} className="rtl-mirror shrink-0" />
              </Link>
            </Reveal>
          </div>

          {/* Feature grid — 3 top, 2 bottom */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            stagger={0.07}
          >
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const count = servicesData.filter((s) => s.category === service.key).length;
              const headline = locale === "ar" ? service.headlineAr : service.headlineEn;
              const blurb = locale === "ar" ? service.blurbAr : service.blurbEn;

              return (
                <div key={service.key} className={i === 3 ? "lg:col-start-1" : ""}>
                  <Link
                    href={`/${locale}/services`}
                    className="group flex flex-col h-full rounded-2xl border border-[#082121]/8 hover:border-[#37B4B4]/40 bg-[#F4FAFA] hover:bg-white transition-all duration-200 p-6 lg:p-7"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#082121]/8 flex items-center justify-center mb-5 group-hover:border-[#37B4B4]/30 transition-colors">
                      <Icon size={18} strokeWidth={1.75} className="text-[#37B4B4]" />
                    </div>

                    {/* Text */}
                    <h3 className="text-[#082121] text-[17px] font-medium leading-snug mb-2">
                      {headline}
                    </h3>
                    <p className="text-[13.5px] text-[#3a5a5a] leading-relaxed flex-1">
                      {blurb}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#082121]/8">
                      <span className="text-[11px] font-semibold tracking-widest uppercase text-[#3a5a5a]/50">
                        {locale === "ar" ? `${count} خدمات متخصصة` : `${count} services`}
                      </span>
                      <span className="w-7 h-7 rounded-full border border-[#082121]/10 flex items-center justify-center text-[#3a5a5a]/50 group-hover:border-[#37B4B4] group-hover:text-[#37B4B4] group-hover:bg-[#37B4B4]/8 transition-all">
                        <ArrowUpRight size={13} strokeWidth={2} className="rtl-mirror" />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
