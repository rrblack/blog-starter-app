import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostHeader } from "@/app/_components/post-header";
import CommentSection from "@/app/_components/comments";
import CommentViewer from "@/app/_components/view-comments";

export default async function Post({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) return notFound();

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <div className="flex justify-center">
            <div className="prose prose-lg prose-invert max-w-3xl w-full px-4 text-white">
              {post.content}
            </div>
          </div>
        </article>
      </Container>
      <CommentViewer />
      <CommentSection />
    </main>
  );
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const { locale, slug } = params;
  const post = await getPostBySlug(slug, locale);

  if (!post) return notFound();

  return {
    title: `${post.title} | Kyle's Japan Life`,
    openGraph: {
      title: post.title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts("ja");
  return posts.map((post) => ({
    locale: "ja",
    slug: post.slug,
  }));
}