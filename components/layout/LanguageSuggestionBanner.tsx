"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { X, Globe } from "lucide-react";

export function LanguageSuggestionBanner() {
  const { locale, switchLocale } = useI18n();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Only suggest Arabic when user is currently viewing the English version
    if (locale !== "en") {
      setShouldShow(false);
      return;
    }

    // Check if dismissed previously in this session or browser
    const dismissed = localStorage.getItem("ak_lang_banner_dismissed");
    if (dismissed === "true") {
      return;
    }

    // Check if cookie ak_lang was explicitly set to en
    const match = document.cookie.match(/ak_lang=([^;]+)/);
    if (match && match[1] === "en") {
      // User explicitly picked English before, do not nag them
      return;
    }

    // Check browser languages for Arabic
    const browserLanguages = navigator.languages || [navigator.language || ""];
    const prefersArabic = browserLanguages.some((lang) =>
      lang.toLowerCase().startsWith("ar")
    );

    // Check for Gulf indicator cookie or query param if set by middleware
    const isGulf = document.cookie.includes("ak_geo_gulf=1");

    if (prefersArabic || isGulf) {
      setShouldShow(true);
    }
  }, [locale]);

  const handleDismiss = () => {
    localStorage.setItem("ak_lang_banner_dismissed", "true");
    setShouldShow(false);
  };

  const handleAcceptArabic = () => {
    localStorage.setItem("ak_lang_banner_dismissed", "true");
    switchLocale("ar");
  };

  if (!shouldShow) return null;

  return (
    <div
      role="region"
      aria-label="Language suggestion"
      className="relative z-50 bg-[#0F172A] border-b border-primary/30 text-white px-4 py-2.5 shadow-md animate-in fade-in slide-in-from-top duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <p className="font-arabic text-base font-medium text-slate-100" dir="rtl">
            تفضّل تصفّح الموقع بالعربية؟
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAcceptArabic}
            className="px-3.5 py-1.5 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold font-arabic transition-colors shadow-sm"
          >
            نعم، الانتقال إلى العربية
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-medium transition-colors"
          >
            Continue in English
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss language suggestion"
            className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
