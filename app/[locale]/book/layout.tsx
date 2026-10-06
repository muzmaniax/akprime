import { Metadata } from "next";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "حجز استشارة استراتيجية | AK Prime Consulting"
      : "Book a Strategy Consultation | AK Prime Consulting",
    description: isAr
      ? "احجز جلسة استشارية استراتيجية مجانية لمدة 30 دقيقة مع خبراء AK Prime Consulting لتقييم عمليات مؤسستك وتحديد الخطوات التنفيذية التالية."
      : "Book a free 30-minute strategy consultation with AK Prime Consulting. Get an honest assessment of your situation and a clear next step.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/book`,
      languages: {
        en: "https://akprime.co.ke/en/book",
        ar: "https://akprime.co.ke/ar/book",
        "x-default": "https://akprime.co.ke/en/book",
      },
    },
  };
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
