import { Metadata } from "next";
import { Locale } from "@/lib/i18n/types";
import { CaseStudiesPageClient } from "./CaseStudiesPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "دراسات الحالة وقصص النجاح | AK Prime الاستشارية"
      : "Case Studies | ERP & Advisory Engagements | AK Prime",
    description: isAr
      ? "استعرض نتائج مشاريعنا الاستشارية في تطبيق نظم تخطيط الموارد ERP والتحول المالي والرقمي للشركات الرائدة في كينيا ودول الخليج العربي."
      : "AK Prime Consulting case studies: real results from ERP implementations, financial transformations, and digital strategy engagements across Kenya, East Africa, and the UAE.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/case-studies`,
      languages: {
        en: "https://akprime.co.ke/en/case-studies",
        ar: "https://akprime.co.ke/ar/case-studies",
        "x-default": "https://akprime.co.ke/en/case-studies",
      },
    },
  };
}

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
