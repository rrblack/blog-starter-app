import Link from "next/link";
import { useTranslations } from "next-intl";


export function Intro() {
  const t = useTranslations("IntroPage")
  return (
    <div>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        {/* Title */}
        <div>
          <h1>{t("title")}</h1>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-red-500">
            Kyle&apos;s Japan Life
          </h1>
        </div>

        {/* Subtitle + About me */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-center font-semibold text-2xl mt-5 md:pl-8 text-white">
            Blog of my life in <span className="text-red-500"> Japan </span>
          </h4>
          <Link
            href="/about/"
            className="text-xl text-white font-bold hover:text-red-500 mt-2 md:mt-3 hover:scale-110 transform transition-transform shadow-red-500/70"
          >
            About me
          </Link>
        </div>
      </section>

      <div className="mt-90 mb-32 md:mb-32 text-center"></div>
    </div>
  );
}