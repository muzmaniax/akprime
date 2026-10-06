"use client";

import React, { createContext, useContext, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Dictionary, Locale } from "./types";
import { enDictionary } from "./dictionaries/en";
import { arDictionary } from "./dictionaries/ar";

export interface I18nContextType {
  locale: Locale;
  dictionary: Dictionary;
  t: Dictionary;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  switchLocale: (targetLocale: Locale) => void;
}

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  ar: arDictionary,
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const dictionary = dictionaries[locale] || dictionaries.en;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const switchLocale = (targetLocale: Locale) => {
    // 1. Set cookie for manual preference persistence
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `ak_lang=${targetLocale}; path=/; max-age=${maxAge}; SameSite=Lax`;

    // 2. Compute new localized pathname
    const currentPath = pathname || `/${locale}`;
    const segments = currentPath.split("/");
    if (segments[1] === "en" || segments[1] === "ar") {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    const newPathname = segments.join("/") || `/${targetLocale}`;
    const search = typeof window !== "undefined" ? window.location.search : "";
    const finalUrl = search ? `${newPathname}${search}` : newPathname;

    startTransition(() => {
      router.push(finalUrl);
      router.refresh();
    });
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        dictionary,
        t: dictionary,
        dir,
        isRTL,
        switchLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: "en",
      dictionary: enDictionary,
      t: enDictionary,
      dir: "ltr",
      isRTL: false,
      switchLocale: () => {},
    };
  }
  return context;
}
