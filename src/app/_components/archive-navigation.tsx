"use client";
import { useTranslations } from "next-intl";


export function ArchiveNavigation() {
  const t = useTranslations("Navigation")
  
  return (
    <div className="md:mb-16 -mt-24 md:-mt-8"> 
    <h1 className ="text-center mb-8 text-white break-keep break-words whitespace-normal font-bold text-4xl"> 
      {t('past_blogs')} 
      </h1>
    <nav className="flex md:flex justify-center items-center flex-wrap gap-x-8 gap-y-4 mb-8 text-lg md:text-2xl text-center rounded-full shadow-md py-5 border border-red-400 shadow-red-700/50 hover:shadow-red-400/90 transition-shadow-900 w-full md:w-auto">
  <a
    href="http://myjapantrip2019.wordpress.com/#"
    className="text-red-600 hover:text-red-700 font-semibold transform transition-transform text-xl hover:scale-105 break-keep whitespace-normal"
  >
    {t("2019_blog")} (<span className="text-white">{t("details")}</span>)
  </a>
  <a
    href="https://kylesjapanlife.wordpress.com/"
    className="text-red-600 hover:text-red-700 font-semibold transform transition-transform text-xl hover:scale-105 break-keep whitespace-normal"
  >
    {t("2022_blog")} (<span className="text-white">{t("details2")}</span>)
  </a>
</nav>

    </div>
  );
}