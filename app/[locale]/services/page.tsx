import { Metadata } from "next";
import { Locale } from "@/lib/i18n/types";
import { ServicesPageClient } from "./ServicesPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "الخدمات الاستشارية | حلول ERP والمالية والتدقيق والموارد البشرية | AK Prime"
      : "Services | ERP, Finance, Audit & HR Consulting | AK Prime",
    description: isAr
      ? "تقدم AK Prime خدمات متكاملة تشمل تطبيق أنظمة ERP (أودو، نت سويت، ساب)، والاستشارات المالية والتدقيق، والموارد البشرية، والذكاء الاصطناعي للمؤسسات في كينيا ودول الخليج العربي."
      : "AK Prime Consulting offers ERP implementation (Odoo, NetSuite, SAP), finance & FP&A consulting, audit & assurance, HR consulting, AI integration, and management consulting for organisations in Kenya and the UAE.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/services`,
      languages: {
        en: "https://akprime.co.ke/en/services",
        ar: "https://akprime.co.ke/ar/services",
        "x-default": "https://akprime.co.ke/en/services",
      },
    },
  };
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}
