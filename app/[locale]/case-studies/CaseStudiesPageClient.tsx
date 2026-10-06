"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type CaseStudy } from "@/data/case-studies";
import { getLocalizedCaseStudies } from "@/lib/i18n/localized-data";
import { useI18n } from "@/lib/i18n/context";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { useSiteImage } from "@/lib/use-site-images";
import { useCMSContent } from "@/lib/use-cms-content";

const FILTERS = [
  { key: "All", en: "All", ar: "الكل" },
  { key: "Finance", en: "Finance", ar: "المالية" },
  { key: "Systems", en: "Systems", ar: "الأنظمة" },
  { key: "Strategy", en: "Strategy", ar: "الاستراتيجية" },
  { key: "Impact", en: "Impact", ar: "الأثر" },
] as const;

export function CaseStudiesPageClient() {
  const { locale, t } = useI18n();
  const isAr = locale === "ar";
  const [filterKey, setFilterKey] = useState<string>("All");
  const cms = useCMSContent();

  const localizedStudies = getLocalizedCaseStudies(locale);

  const merged = localizedStudies.map((cs) => {
    // CMS content is English-only; skip it for Arabic.
    const cmsCs = isAr ? undefined : (cms?.["case-studies"]?.[cs.id] as Record<string, unknown> | undefined);
    if (!cmsCs) return cs;
    return {
      ...cs,
      ...(cmsCs.tagline ? { tagline: cmsCs.tagline as string } : {}),
      ...(cmsCs.summary ? { summary: cmsCs.summary as string } : {}),
      ...(cmsCs.metrics ? { metrics: cmsCs.metrics as CaseStudy["metrics"] } : {}),
    };
  });

  const visible =
    filterKey === "All" ? merged : merged.filter((cs) => cs.category === filterKey);

  return (
    <>
      {/* ── Header ── */}
      <section
        className="section-dark border-b border-white/[0.06]"
        style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "36px" }}
      >
        <div className="container-x">
          <Reveal><Eyebrow>{isAr ? "دراسات الحالة وقصص النجاح" : "Case Studies"}</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1
              className="mt-3 text-white text-balance max-w-[22ch]"
              style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.15 }}
            >
              {isAr ? "شراكات استشارية استراتيجية مع قادة الأعمال." : "Advisory engagements with business leaders."}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-lg">
              {isAr
                ? "نساعد قادة الشركات على تشخيص أوضاع مؤسساتهم بوضوح وتحديد المشكلات الجوهرية وتصميم استراتيجيات تقنية وتشغيلية قابلة للتنفيذ المستدام."
                : "We help leaders see their business clearly, identify the real problems, and design strategies that can actually be executed."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Filter bar — only shown with 3+ case studies ── */}
      {localizedStudies.length > 2 && (
        <div className="section-dark border-b border-white/[0.06]" style={{ paddingTop: 14, paddingBottom: 14 }}>
          <div className="container-x flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterKey(f.key)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                    filterKey === f.key
                      ? "border-[#37B4B4] text-[#37B4B4] bg-[#37B4B4]/10"
                      : "border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  {isAr ? f.ar : f.en}
                </button>
              ))}
            </div>
            <span className="text-xs text-white/20 shrink-0 tabular-nums">
              {isAr ? `${visible.length} شراكة منجزة` : `${visible.length} engagement${visible.length !== 1 ? "s" : ""}`}
            </span>
          </div>
        </div>
      )}

      {/* ── Cards ── */}
      <section className="section-dark" style={{ paddingTop: 32, paddingBottom: 72 }}>
        <div className="container-x">
          {visible.length === 0 ? (
            <p className="text-sm text-white/30 py-20 text-center">
              {isAr ? "لا توجد مشاريع في هذا التصنيف حالياً." : "No engagements in this category yet."}
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
              {visible.map((cs, i) => (
                <Reveal key={cs.id} delay={i * 80} className="h-full">
                  <CaseStudyCard cs={cs} locale={locale} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABannerSection />
    </>
  );
}

function CaseStudyCard({ cs, locale }: { cs: CaseStudy; locale: string }) {
  const photo = useSiteImage(`casestudy.${cs.id}`) || cs.image;
  const isAr = locale === "ar";

  return (
    <Link
      href={`/${locale}/case-studies/${cs.id}`}
      className="group block card-dark p-6 h-full flex flex-col justify-between hover:border-[#37B4B4]/40 transition-colors"
    >
      <div>
        <div className="aspect-[16/9] relative overflow-hidden rounded-xl mb-5">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${photo})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082121] via-transparent" />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-[#37B4B4] uppercase tracking-wider">
            {cs.category}
          </span>
          <span className="text-white/20">·</span>
          <span className="text-xs text-white/40">{cs.client}</span>
        </div>
        <h3 className="text-white text-lg font-medium group-hover:text-[#37B4B4] transition-colors mb-2">
          {cs.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed line-clamp-3 mb-6">
          {cs.summary}
        </p>
      </div>

      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex gap-4">
          {cs.metrics?.slice(0, 2).map((m, idx) => (
            <div key={idx}>
              <div className="text-[#37B4B4] font-semibold text-base">{m.value}</div>
              <div className="text-[11px] text-white/40">{m.label}</div>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#37B4B4] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
          {isAr ? "قراءة دراسة الحالة" : "Read case study"}{" "}
          <ArrowUpRight size={13} strokeWidth={2.25} className="rtl-mirror" />
        </span>
      </div>
    </Link>
  );
}
