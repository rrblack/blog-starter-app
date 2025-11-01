"use client";

import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { usePathname, useParams } from "next/navigation";

const LOCALES = ["en", "ja"];
const DEFAULT_LOCALE = "en";
const COOKIE_NAME = "USER_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

function setLocaleCookie(locale: string) {
  try {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
  } catch {}
}

function makeLocalizedHref(path: string, currentLocale: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `/${currentLocale}${path === "/" ? "" : path}`;
}

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const pathname = usePathname() || "/";
  const params = useParams() as { locale?: string } | undefined;
  const paramLocale = params?.locale;
  const firstSeg = pathname.split("/")[1];
  const currentLocale = paramLocale ?? (LOCALES.includes(firstSeg) ? firstSeg : DEFAULT_LOCALE);

  const postBase = `/posts/${slug}`;
  const localizedPostHref = makeLocalizedHref(postBase, currentLocale);

  return (
    <section>
      <div className="mb-8 md:mb-16">
        <Link href={localizedPostHref} onClick={() => setLocaleCookie(currentLocale)} aria-label={title}>
          {/* CoverImage no longer renders its own Link; pass only title and src */}
          <CoverImage title={title} src={coverImage} onClick={() => { /* optional extra */ }} />
        </Link>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="font-bold mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              href={localizedPostHref}
              onClick={() => setLocaleCookie(currentLocale)}
              className="inline-block text-white hover:text-slate-200 transform transition-transform hover:scale-105 hover:-rotate-1"
            >
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} locale={currentLocale} />
          </div>
        </div>

        <div>
          <Link href={localizedPostHref} onClick={() => setLocaleCookie(currentLocale)} className="text-lg leading-relaxed mb-4">
            <p className="inline-block transform transition-transform hover:scale-y-105 text-lg leading-relaxed mb-4">{excerpt}</p>
          </Link>

          <Link href={`/${currentLocale}/about`} onClick={() => setLocaleCookie(currentLocale)} className="inline-block hover:text-red-500">
            <Avatar name={author.name} picture={author.picture} />
          </Link>
        </div>
      </div>
    </section>
  );
}