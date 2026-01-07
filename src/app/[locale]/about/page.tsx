"use client";

import Header from "@/app/_components/header";
import Image from "next/image";
import Container from "@/app/_components/container";
import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";
import Spinner from "@/app/_components/comment_spinner";
import cn from "classnames";

export const runtime = "edge";

export default function AboutPage() {
  const [isLoading, setLoading] = useState(true);
  const t = useTranslations("About");

  return (
    <main>
      <Container>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <div className="md:mt-36 mt-2">
          <h1 data-aos="fade-up" className="md:-mt-20 text-center text-4xl break-keep break-words whitespace-normal md:text-7xl mb-12">
            {t("header")}
          </h1>
          <div data-aos="fade-up" className="md:mt-20 justify-center">
            <Image
              src="/assets/blog/authors/Img_2025_02_16_00_19_00.jpeg"
              alt="著者の写真"
              width={300}
              height={400}
              className={cn(
                "rounded-l-full mx-auto mt-10 opacity-0",
                isLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setLoading(false)}
            />
            {isLoading && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center md:text-center md:text-xl mt-10 mx-5 md:mx-60 mb-10 md:text-wrap">
            <p data-aos="fade-up">{t("p1")}</p>
            <br></br>
            <p data-aos="fade-up">{t("p2")}</p>
            <br></br>
            <p data-aos="fade-up">{t("p3")}</p>
          </div>
        </div>
      </Container>
    </main>
  );
}
