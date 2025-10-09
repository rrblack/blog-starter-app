import Header from "@/app/_components/header";
import Image from "next/image";
import Container from "@/app/_components/container";

export default function AboutPage() {
  return (
    <main>
      <Container >
        <Header />
        <div className="md:mt-36 mt-2"> 
          <h1 className="md:-mt-20 text-center text-4xl md:text-8xl mb-12"> Hi I'm Kyle </h1>
        <div className="md:mt-20"> 
        <Image
        src="/assets/blog/authors/Img_2025_02_16_00_19_00.jpeg"
        alt="Picture of the author"
        width={300}
        height={200}
        className="rounded-l-full mx-auto mt-10">
        </Image>
        </div>
      <p className="flex items-center md:text-center md:text-xl md:text-wrap mt-10 md:mt-10 mx-5 md:mx-60 mb-10 md:mb-15"> 
        Thanks for stopping in on my blog! Originally from Chattanooga Tennessee, I first came to Japan in July 2022 through the JET Programme, spending an unforgettable year in the beautiful town of Muroto, Kōchi Prefecture. That time deepened my love for Japan’s culture, language, and people. <br/>

        <br/> After a year in the country side of Kōchi, I moved to the hectic and busy city of Tokyo to pursue a career in IT. I'm currently working in the tech industry, where I apply skills I taught myself through self-study. The same goes for Japanese—through consistent study and immersion, I earned the JLPT N1, the highest level of Japanese proficiency. <br/> 

        <br/> This blog is where I share my journey, experiences, and thoughts on life in Japan, language learning, and working in tech. Stay tuned for more interesting stories!<br/> </p>
        </div> 
        </Container>
    </main>
  );
} 