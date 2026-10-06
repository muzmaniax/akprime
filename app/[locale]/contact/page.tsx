import { Metadata } from "next";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { ContactSection } from "@/components/sections/ContactSection";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "تواصل معنا | حجز استشارة استراتيجية | AK Prime"
      : "Contact AK Prime Consulting | Book a Consultation",
    description: isAr
      ? "تواصل مع خبراء AK Prime Consulting في كينيا والإمارات. احجز جلسة استشارية لتطبيق أنظمة ERP والتحول الرقمي والاستشارات المالية والإدارية."
      : "Get in touch with AK Prime Consulting (AKPrime). Book a consultation for ERP implementation, finance consulting, or digital transformation in Kenya and the UAE.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/contact`,
      languages: {
        en: "https://akprime.co.ke/en/contact",
        ar: "https://akprime.co.ke/ar/contact",
        "x-default": "https://akprime.co.ke/en/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <>
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x">
          <Reveal><Eyebrow>{isAr ? "تواصل معنا" : "Contact"}</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance max-w-[22ch]" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.15 }}>
              {isAr ? "الوضوح المؤسسي يبدأ بحوار استراتيجي مباشر." : "Clarity starts with the right conversation."}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-2xl">
              {isAr
                ? "شاركنا بعض التفاصيل حول التحديات أو المشاريع التي تعمل عليها. وسيقوم أحد مستشارينا بالرد عليك خلال يوم عمل واحد لتحديد الخطوات التالية."
                : "Share a few details about what you're working on. We respond within one business day with next steps."}
            </p>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
