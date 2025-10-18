"use client";

import SubscribeForm from "@/app/_components/newsletter";
import useTranslation from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Newsletter form */}
        <SubscribeForm />

        {/* Translated heading */}
        <h2 className="mt-6 text-center text-xl font-semibold">
          {t("stay_updated")}
        </h2>

        {/* Copyright */}
        <p className="mt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} {t("Intro.title")}. All rights reserved.
        </p>

        {/* Language switcher */}
        <div className="mt-4 flex justify-center">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
