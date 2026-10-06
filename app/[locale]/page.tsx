import { Metadata } from "next";
import { Locale } from "@/lib/i18n/types";
import { HomePageClient } from "@/components/sections/HomePageClient";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "AK Prime للاستشارات | حلول ERP والمالية والتدقيق والموارد البشرية"
      : "AK Prime Consulting | Finance, Audit, HR & ERP Advisory",
    description: isAr
      ? "إيه كي برايم للاستشارات — استشارات مالية وتدقيق وموارد بشرية وتطبيق أنظمة تخطيط الموارد ERP (أودو، نت سويت، ساب) للمؤسسات في كينيا ودول الخليج. مكاتبنا في نيروبي ومومباسا ودبي."
      : "AK Prime Consulting — finance consulting, audit services, HR consulting, and ERP implementation (Odoo, NetSuite, SAP) for organisations in Kenya and the UAE. Senior advisory teams in Mombasa, Nairobi, and Dubai.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}`,
      languages: {
        en: "https://akprime.co.ke/en",
        ar: "https://akprime.co.ke/ar",
        "x-default": "https://akprime.co.ke/en",
      },
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
