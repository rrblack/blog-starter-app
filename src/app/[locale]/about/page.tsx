import Header from "@/app/_components/header";
import Image from "next/image";
import Container from "@/app/_components/container";

export default function AboutPageJa() {
  return (
    <main>
      <Container>
        <Header />
        <div className="md:mt-36 mt-2">
          <h1 className="md:-mt-20 text-center text-4xl md:text-8xl mb-12">
            こんにちは、カイルです
          </h1>
          <div className="md:mt-20">
            <Image
              src="/assets/blog/authors/Img_2025_02_16_00_19_00.jpeg"
              alt="著者の写真"
              width={300}
              height={200}
              className="rounded-l-full mx-auto mt-10"
            />
          </div>
          <p className="flex items-center md:text-center md:text-xl md:text-wrap mt-10 md:mt-10 mx-5 md:mx-60 mb-10 md:mb-15">
            私のブログに立ち寄っていただきありがとうございます！アメリカ・テネシー州チャタヌーガ出身で、
            2022年7月にJETプログラムを通じて初めて日本に来ました。高知県室戸市で過ごした忘れられない1年間は、
            日本の文化、言語、人々への愛情を深めるきっかけとなりました。<br />
            <br />
            高知の田舎での1年を経て、ITのキャリアを追求するために忙しい東京へ移りました。
            現在はテック業界で働いており、独学で身につけたスキルを活かしています。
            日本語も同様に、継続的な学習と没入を通じて、日本語能力試験N1に合格しました。<br />
            <br />
            このブログでは、日本での生活、言語学習、IT業界での経験について発信しています。
            ぜひ楽しみにしてください！<br />
          </p>
        </div>
      </Container>
    </main>
  );
}