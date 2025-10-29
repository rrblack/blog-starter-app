"use client";

import Link from "next/link";
import LanguageSwitcher from "./language-switcher";
import { Suspense } from "react";
import { usePathname, useParams } from "next/navigation";

const LOCALES = ["en", "ja"];
const DEFAULT_LOCALE = "en";

const Header = () => {
  const pathname = usePathname() || "/";
  const params = useParams() as { locale?: string } | undefined;
  const paramLocale = params?.locale;
  const firstSeg = pathname.split("/")[1];
  const currentLocale = paramLocale ?? (LOCALES.includes(firstSeg) ? firstSeg : DEFAULT_LOCALE);

  // Home should point to the locale root (e.g., /en or /ja)
  const homeHref = `/${currentLocale}`;

  return (
    <div>
      <div className="flex justify-end">
        <Suspense fallback={null}>
          <LanguageSwitcher />
        </Suspense>
      </div>

      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
        <Link href={homeHref} className="inline-block transform transition-transform hover:scale-105 text-red-500">
          Kyle's Japan Life
        </Link>
      </h2>
    </div>
  );
};

export default Header;