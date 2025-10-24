"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";

export function Intro() {
  const t = useTranslations("IntroPage");
  const country = t("country");
  const subtitle = t("subtitle");

  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : "";
  const params = useParams();
  const paramLocale = (params as { locale?: string })?.locale;
  const firstSeg = pathname.split("/")[1];
  const currentLocale = paramLocale ?? (firstSeg === "en" || firstSeg === "ja" ? firstSeg : "en");

  return (
    <>
      <div>
        <div className="flex justify-end">
          <Suspense fallback={<div>Loading...</div>}>
        <LanguageSwitcher/>
        </Suspense>
        </div>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
          {/* Title */}
          <div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-red-500">
              Kyle&apos;s Japan Life
            </h1>
          </div>

          {/* Subtitle + About me */}
          <div className="flex flex-col items-center md:items-end"> {currentLocale === "ja" ? ( 
            <h4 className="text-center font-semibold text-2xl mt-5 md:pl-8 text-red-500">
               {country}<span className="text-white">{subtitle} </span>
            </h4> ) :(<h4 className="text-center font-semibold text-2xl mt-5 md:pl-8 text-white">
               {subtitle} <span className="text-red-500">{country}</span> </h4>)}
            <Link
              href="/about/"
              className="text-xl text-white font-bold hover:text-red-500 mt-2 md:mt-3 hover:scale-110 transform transition-transform shadow-red-500/70"
            >
              {t("about_me")}
            </Link>
          </div>
        </section>

        <div className="mt-90 mb-32 md:mb-32 text-center"></div>
      </div>
    </>
  );
}