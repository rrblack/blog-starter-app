import Header from "@/app/_components/header";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
        <Header />
      <h1 className="md:-mt-20 text-center text-4xl md:text-8xl"> Hi I'm Kyle </h1>
        <Image
        src="/assets/blog/authors/joe.jpeg"
        alt="Picture of the author"
        width={100}
        height={100}
        className="rounded-full mx-auto mt-10">
        </Image>
      <p className="flex items-center md:text-center md:text-xl md:text-wrap mt-10 md:mt-10 mx-5 md:mx-60 mb-10 md:mb-15"> 
        Thanks for stopping in on my blog! Originally from Chattanooga Tennessee, I first came to Japan in July 2022 through the JET Programme, spending an unforgettable year in the beautiful town of Muroto, Kōchi Prefecture. That time deepened my love for Japan’s culture, language, and people. <br/>

        <br/> After my year in Kōchi, I moved to Tokyo to pursue a career in IT. I'm currently working in the tech industry, where I apply skills I taught myself through self-study. The same goes for Japanese—through consistent study and immersion, I earned the JLPT N1, the highest level of Japanese proficiency. <br/> 

        <br/> This blog is where I share my journey, experiences, and thoughts on life in Japan, language learning, and working in tech. Thanks for stopping by!<br/> </p>
    </main>
  );
} 