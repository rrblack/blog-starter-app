"use client";

import Header from "@/app/_components/header";
import Image from "next/image";
import Container from "@/app/_components/container";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");
  return (
    <main>
      <Container>
        <Header />
        <div className="md:mt-36 mt-2">
          <h1 className="md:-mt-20 text-center text-4xl break-keep md:text-8xl mb-12">
            {t("header")}
          </h1>
          <div className="md:mt-20">
            <Image
              src="/assets/blog/authors/Img_2025_02_16_00_19_00.jpeg"
              alt="著者の写真"
              width={300}
              height={400}
              className="rounded-l-full mx-auto mt-10"
            />
          </div>
          <p className="flex items-center md:text-center md:text-xl md:text-wrap mt-10 md:mt-10 mx-5 md:mx-60 mb-10 md:mb-15">
            {t("p1")}<br />
            <br />
           {t("p2")}<br />
            <br />
            {t("p3")}<br />
          </p>
        </div>
      </Container>
    </main>
  );
}