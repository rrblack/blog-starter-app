import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Footer from "@/app/_components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Kyle's Japan Life`,
  description: `Blog of my life in Japan`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export async function generateStaticParams() {
  return ["en", "ja"].map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  params,
  children
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  let messages: Record<string, any>;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`@/messages/en.json`)).default;
  }

  return (
    <html lang={locale} className="min-h-screen bg-black text-white">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}