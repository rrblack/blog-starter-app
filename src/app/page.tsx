import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export function ArchiveNavigation() {
  return (
    <div className="mb-16 -mt-8"> 
    <h1 className ="text-center mb-8 text-white font-bold text-4xl"> Looking for past blogs? 
      </h1>
    <nav className="flex justify-center space-x-4 mb-8 text-xl">
      <a
        href="http://myjapantrip2019.wordpress.com/#"
        className="text-red-600 hover:text-red-700 font-semibold"
      >
        2019 Blog (First time in Japan)
      </a>
      <a
        href="https://kylesjapanlife.wordpress.com/"
        className="text-red-600 hover:text-red-700 font-semibold"
      >
        2022 Blog (Covers my life in Japan from July 2022- January 2024)
      </a>
        </nav>
    </div>
  );
}
export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <ArchiveNavigation />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
