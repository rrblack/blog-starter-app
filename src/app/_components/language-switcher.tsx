"use client";
import Link from "next/link";
import { usePathname, useSearchParams, useLocale } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : "";
  const locale = useLocale() ?? "en";

  return (
    <div className="flex gap-2 items-center">
      <Link href={pathname + search} locale="en" className={locale === "en" ? "font-bold" : ""}>
        EN
      </Link>
      <Link href={pathname + search} locale="ja" className={locale === "ja" ? "font-bold" : ""}>
        日本語
      </Link>
    </div>
  );
}
