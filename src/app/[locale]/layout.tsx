import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "../_components/footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages: Record<string, any> = {};
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    try {
      messages = (await import(`@/messages/en.json`)).default;
    } catch {
      messages = {};
    }
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <Footer/>
    </NextIntlClientProvider>
  );
}