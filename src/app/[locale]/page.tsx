import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { ArchiveNavigation } from "@/app/_components/archive-navigation";
import { Intro } from "../_components/intro";

export default async function Index({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const allPosts = await getAllPosts(locale);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro /> 
        <ArchiveNavigation />
        <HeroPost {...heroPost} />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        <div className="mt-16" />
      </Container>
    </main>
  );
}
