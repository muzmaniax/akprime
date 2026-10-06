"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const MAIN_PAGES = [
  "services",
  "industries",
  "case-studies",
  "insights",
  "about",
  "contact",
  "book",
  "resources",
];

export function MobileBackButton() {
  const pathname = usePathname();
  const { locale } = useI18n();
  const isAr = locale === "ar";

  // Check if pathname ends with one of the main routes (e.g. /en/services or /ar/about)
  const segments = pathname.split("/").filter(Boolean);
  const isMainPage = segments.length === 2 && MAIN_PAGES.includes(segments[1]);

  if (!isMainPage) return null;

  return (
    <div className="lg:hidden px-4 pt-4 pb-0">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#37B4B4] hover:text-white transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={2.5} className="rtl-mirror" />
        {isAr ? "العودة للرئيسية" : "Back to home"}
      </Link>
    </div>
  );
}
