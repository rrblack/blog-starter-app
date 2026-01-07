"use client";

import { usePathname, useSearchParams, useRouter, useParams } from "next/navigation";
import { useCallback, useEffect } from "react";

const LOCALES = ["en", "ja"];
const COOKIE_NAME = "USER_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setLocaleCookie(locale: string) {
  try {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
  } catch {}
}

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : "";
  const router = useRouter();
  const params = useParams();
  const paramLocale = (params as { locale?: string })?.locale;
  const firstSeg = pathname.split("/")[1];
  const currentLocale = paramLocale ?? (firstSeg === "en" || firstSeg === "ja" ? firstSeg : "en");
  const targetLocale = currentLocale === "ja" ? "en" : "ja";

  const toggle = useCallback((locale: string) => {
    // build new path: replace existing locale segment or prefix if missing
    const segments = pathname.split("/").filter(Boolean);
    let newPathname: string;
    if (segments.length > 0 && LOCALES.includes(segments[0])) {
      segments[0] = locale;
      newPathname = "/" + segments.join("/");
    } else {
      newPathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    }

    setLocaleCookie(locale);
    router.push(newPathname + search);
  }, [pathname, router, search]);

  useEffect(() => {
  if (typeof window !== "undefined" && (window as any).AOS) {
    (window as any).AOS.init();
  }
    }, [setLocaleCookie]);

  return (
    <button
      type="button"
      onClick={() => toggle(targetLocale)}
      aria-label={currentLocale === "ja" ? "Switch to English" : "日本語に切り替え"}
      className="px-3 py-1 rounded-xl border border-red-500 bg-transparent font-bold text-white hover:text-red-500 mt-2 md:mt-3 hover:scale-110 transform transition-transform shadow-red-500/70"
    >
      {currentLocale === "ja" ? "EN" : "日本語"}
    </button>
  );
}