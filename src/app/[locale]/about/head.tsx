import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  const title =
    locale === "ja"
      ? "僕について | Kyle's Japan Life"
      : "About | Kyle's Japan Life";

  const description =
    locale === "ja"
      ? "このブログについての紹介ページです。"
      : "About page for Kyle's Japan Life blog.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://kylesjapan.life/${locale}/about`,
      languages: {
        en: "https://kylesjapan.life/en/about",
        ja: "https://kylesjapan.life/ja/about",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://kylesjapan.life/${locale}/about`,
      images: ["/assets/blog/authors/Img_2025_02_16_00_19_00.jpeg"],
    },
  };
}
