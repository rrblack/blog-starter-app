"use client";

import { Suspense } from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./language-switcher";


function makeLocalizedHref(path: string, currentLocale: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `/${currentLocale}${path === "/" ? "" : path}`;
}

const LOCALES = ["en", "ja"];
const DEFAULT_LOCALE = "en";

export function Intro() {
  const t = useTranslations("IntroPage");
  const country = t("country");
  const subtitle = t("subtitle");

  const pathname = usePathname() || "/";
  const params = useParams() as { locale?: string } | undefined;
  const paramLocale = params?.locale;
  const firstSeg = pathname.split("/")[1];
  const currentLocale = paramLocale ?? (LOCALES.includes(firstSeg) ? firstSeg : DEFAULT_LOCALE);
  
  const aboutBase = `/about`;
  const localizedPostHref = makeLocalizedHref(aboutBase, currentLocale);

  return (
    <>
      <div>
        <div className="flex justify-end">
          <Suspense fallback={null}>
        <LanguageSwitcher/>
        </Suspense>
        </div>
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 break-keep break-words whitespace-normal">
          {/* Title */}
          <div>
            <h1 className="text-balance text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-red-500">
              Kyle&apos;s Japan Life
            </h1>
          </div>

          {/* Subtitle + About me */}
          <div className="flex flex-col items-center md:items-end md:flex-1 md:text-right">
        {currentLocale === "ja" ? (
          <h4 className="text-center md:text-right font-semibold text-2xl md:text-3xl mt-5 md:pl-8 text-red-500">
            {country}<span className="text-white">{subtitle}</span>
          </h4>
        ) : (
          <h4 className="text-center md:text-right font-semibold text-2xl md:text-3xl mt-5 md:pl-8 text-white">
            {subtitle} <span className="text-red-500">{country}</span>
          </h4>
        )}
        <Link
          href={localizedPostHref}
          className="text-xl md:text-2xl text-white font-bold hover:text-red-500 mt-2 md:mt-3 hover:scale-110 transform transition-transform shadow-red-500/70"
        >
          {t("about_me")}
        </Link>
    </div>
        </section>

        {/* Use this area for when you want to add banner below Kyle's Japan Life //}
        {/* <div className="mt-90 mb-32 md:mb-32 text-center"></div> */}
      </div>
    </>
  );
}