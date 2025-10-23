"use client";

import { usePathname, useSearchParams, useRouter, useParams } from "next/navigation";
import { useCallback } from "react";

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : "";
  const router = useRouter();
  const params = useParams(); // { locale?: "en" | "ja" } when route is /[locale]/...
  const paramLocale = (params as { locale?: string })?.locale;
  const firstSeg = pathname.split("/")[1];
  const currentLocale = paramLocale ?? (firstSeg === "en" || firstSeg === "ja" ? firstSeg : "en");

  const toggle = useCallback(() => {
    const target = currentLocale === "ja" ? "en" : "ja";

    const segs = pathname.split("/"); // ["", "en", ...] or ["", ...]
    const isLocaleSegment = segs[1] === "en" || segs[1] === "ja";
    let newPath: string;

    if (isLocaleSegment) {
      segs[1] = target;
      newPath = segs.join("/") || `/${target}`;
    } else {
      // no locale segment present, prepend
      const trimmed = pathname === "/" ? "" : pathname;
      newPath = `/${target}${trimmed}`;
    }

    newPath = `${newPath}${search}`;
    router.push(newPath);
  }, [currentLocale, pathname, search, router]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={currentLocale === "ja" ? "Switch to English" : "日本語に切り替え"}
      className="px-3 py-1 rounded-xl border border-red-500 bg-transparent font-bold text-white hover:text-red-500 mt-2 md:mt-3 hover:scale-110 transform transition-transform shadow-red-500/70"
    >
      {currentLocale === "ja" ? "EN" : "日本語"}
    </button>
  );
}