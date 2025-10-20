import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { ArchiveNavigation } from "@/app/_components/archive-navigation";

export default async function Index({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const allPosts = await getAllPosts(locale);

  if (allPosts.length === 0) {
    return (
      <main>
        <Container>
          <Intro />
          <p>No posts yet.</p>
        </Container>
      </main>
    );
  }

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
        <div className="mt-16" />
      </Container>
    </main>
  );
}