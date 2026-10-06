"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile" | "footer";
  className?: string;
}

export function LanguageSwitcher({
  variant = "desktop",
  className = "",
}: LanguageSwitcherProps) {
  const { locale, switchLocale } = useI18n();

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 text-xs ${className}`}>
        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">Language:</span>
        <button
          type="button"
          onClick={() => switchLocale("en")}
          aria-current={locale === "en" ? "true" : undefined}
          className={`px-2 py-1 rounded transition-colors ${
            locale === "en"
              ? "font-semibold text-primary underline underline-offset-4"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          English
        </button>
        <span className="text-muted-foreground/40">|</span>
        <button
          type="button"
          onClick={() => switchLocale("ar")}
          aria-current={locale === "ar" ? "true" : undefined}
          className={`px-2 py-1 rounded font-arabic transition-colors ${
            locale === "ar"
              ? "font-semibold text-primary underline underline-offset-4"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          العربية
        </button>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div
        className={`flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/50 ${className}`}
        role="group"
        aria-label="Language selection"
      >
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2">
          <Globe className="w-4 h-4 text-primary" />
          <span>Language / اللغة</span>
        </div>
        <div className="flex items-center rounded-md bg-background/80 p-0.5 border border-border/40 shadow-xs">
          <button
            type="button"
            onClick={() => switchLocale("en")}
            aria-current={locale === "en" ? "true" : undefined}
            className={`px-3 py-1 text-xs rounded-sm transition-all duration-200 ${
              locale === "en"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => switchLocale("ar")}
            aria-current={locale === "ar" ? "true" : undefined}
            className={`px-3 py-1 text-xs font-arabic rounded-sm transition-all duration-200 ${
              locale === "ar"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            العربية
          </button>
        </div>
      </div>
    );
  }

  // Desktop default
  return (
    <div
      className={`inline-flex items-center rounded-full bg-secondary/50 p-0.5 border border-border/60 backdrop-blur-xs text-xs shadow-2xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => switchLocale("en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
          locale === "en"
            ? "bg-primary text-primary-foreground font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        English
      </button>
      <span className="text-muted-foreground/30 px-0.5 select-none">|</span>
      <button
        type="button"
        onClick={() => switchLocale("ar")}
        aria-current={locale === "ar" ? "true" : undefined}
        className={`px-2.5 py-1 rounded-full text-xs font-arabic font-medium transition-all duration-200 ${
          locale === "ar"
            ? "bg-primary text-primary-foreground font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        العربية
      </button>
    </div>
  );
}
