"use client";

import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { usePathname, useParams } from "next/navigation";

const LOCALES = ["en", "ja"];
const DEFAULT_LOCALE = "en";
const COOKIE_NAME = "USER_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setLocaleCookie(locale: string) {
  try {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
  } catch {}
}

function makeLocalizedHref(path: string, currentLocale: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `/${currentLocale}${path === "/" ? "" : path}`;
}

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) {
  const pathname = usePathname() || "/";
  const params = useParams() as { locale?: string } | undefined;
  const paramLocale = params?.locale;
  const firstSeg = pathname.split("/")[1];
  const currentLocale = paramLocale ?? (LOCALES.includes(firstSeg) ? firstSeg : DEFAULT_LOCALE);

  const postPath = `/posts/${slug}`;
  const localizedHref = makeLocalizedHref(postPath, currentLocale);

  return (
    <div>
      <div className="mb-5">
        <Link href={localizedHref} onClick={() => setLocaleCookie(currentLocale)} aria-label={title}>
          <CoverImage title={title} src={coverImage} onClick={() => { /* optional extra */ }} />
        </Link>
      </div>
      <h3 className="text-3xl md:text-4xl mb-3 leading-snug font-semibold">
        <Link
          href={localizedHref}
          onClick={() => setLocaleCookie(currentLocale)}
          className="inline-block text-white hover:text-slate-200 transform transition-transform hover:scale-105 hover:-rotate-1"
        >
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} locale={currentLocale} />
      </div>
      <div>
        <Link href={localizedHref} onClick={() => setLocaleCookie(currentLocale)} className="text-lg leading-relaxed mb-4">
          <div className="text-lg leading-relaxed mb-4">
          <span dangerouslySetInnerHTML={{__html:excerpt}} />
          </div>
        </Link>
      </div>
    </div>
  );
}