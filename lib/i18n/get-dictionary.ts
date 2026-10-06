import { Dictionary, Locale } from "./types";
import { enDictionary } from "./dictionaries/en";
import { arDictionary } from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  ar: arDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

export function isValidLocale(locale: string): locale is Locale {
  return locale === "en" || locale === "ar";
}
