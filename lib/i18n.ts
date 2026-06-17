import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

// pt.json is the source of truth for the dictionary shape; en.json mirrors it.
export type Dictionary = typeof pt;

const dictionaries: Record<Locale, Dictionary> = {
  pt,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** A string that exists in both languages. */
export type Localized = { pt: string; en: string };

export function pick(value: Localized, locale: Locale): string {
  return value[locale];
}

/** The other locale — used for the language toggle and hreflang. */
export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}
