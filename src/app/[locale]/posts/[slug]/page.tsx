import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostHeader } from "@/app/_components/post-header";
import CommentSection from "@/app/_components/comments";
import CommentViewer from "@/app/_components/view-comments";
import { Suspense } from "react";


type PostParams = { locale: string; slug: string };

export default async function Post({
  params,
}: {
  params: Promise<PostParams>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) return notFound();

  
  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Suspense fallback={null}>
        <Header />
        </Suspense>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            locale={post.locale}
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
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

//  Generate static params for *all* locales
export async function generateStaticParams() {
  const locales = ["en", "ja"]; // add more if needed
  const allPostsByLocale = await Promise.all(
    locales.map((locale) => getAllPosts(locale))
  );

  return allPostsByLocale.flatMap((posts, i) =>
    posts.map((post) => ({
      locale: locales[i],
      slug: post.slug,
    }))
  );
}