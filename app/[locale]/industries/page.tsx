"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookingModal } from "@/components/ui/BookingModal";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { type Industry } from "@/data/industries";
import { getLocalizedIndustries } from "@/lib/i18n/localized-data";
import { useI18n } from "@/lib/i18n/context";
import { CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";
import { useSiteImage } from "@/lib/use-site-images";

export default function IndustriesPage() {
  const { locale, t } = useI18n();
  const isAr = locale === "ar";
  const [bookingOpen, setBookingOpen] = useState(false);
  const industries = getLocalizedIndustries(locale);

  return (
    <>
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x">
          <Reveal><Eyebrow>{isAr ? "القطاعات المتخصصة" : "Industries"}</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance max-w-[20ch]" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}>
              {isAr ? "القطاعات الاستراتيجية التي نخدمها." : "Industries we serve."}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-2xl">
              {isAr
                ? "نعمل عبر قطاعات حيوية تحظى فيها القرارات بأثر مالي وتشغيلي وتنظيمي حاسم، ونقدم حلولاً ترتقي بالأداء وتضمن الامتثال."
                : "We work across industries where decisions carry real financial, operational, and strategic consequences."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-dark section-py">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 6) * 60}>
                <IndustryCard ind={ind} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection onBooking={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}

/* ── Each card is its own component so it can call useSiteImage ── */
function IndustryCard({ ind, locale }: { ind: Industry; locale: string }) {
  const photo = useSiteImage(`industry.${ind.slug}`) || ind.photo;
  const isAr = locale === "ar";

  return (
    <Link href={`/${locale}/industries/${ind.slug}`} className="group block card-dark overflow-hidden">
      <div className="aspect-[16/10] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${photo})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#082121] via-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-white group-hover:text-[#37B4B4] transition-colors">{ind.name}</h3>
        <p className="mt-2 text-[13px] text-white/55 leading-relaxed line-clamp-2">{ind.shortDescription}</p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#37B4B4] flex-wrap">
          {isAr ? "عرض تفاصيل القطاع" : "View industry"} <ArrowUpRight size={13} strokeWidth={2.25} className="shrink-0 rtl-mirror" />
        </div>
      </div>
    </Link>
  );
}
