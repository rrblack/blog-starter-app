import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Footer from "@/app/_components/footer";
import "../globals.css";
;

export default async function ({ params, children }: { params: Promise<{ locale: string }>; children: React.ReactNode }) { 

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering for this request tree
  setRequestLocale(locale);

  let messages: Record<string, any>;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`@/messages/en.json`)).default;
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}