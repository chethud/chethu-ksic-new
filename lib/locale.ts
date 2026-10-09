export type SiteLocale = "en" | "kn";

export const LOCALE_STORAGE_KEY = "ksic:locale";

export function readLocale(): SiteLocale {
  if (typeof window === "undefined") return "en";
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return value === "kn" ? "kn" : "en";
  } catch {
    return "en";
  }
}

export function writeLocale(locale: SiteLocale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("ksic:locale-changed", { detail: locale }));
  document.documentElement.lang = locale === "kn" ? "kn" : "en";
}
