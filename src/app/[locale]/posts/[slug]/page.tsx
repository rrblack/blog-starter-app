import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostHeader } from "@/app/_components/post-header";
import CommentSection from "@/app/_components/comments";
import CommentViewer from "@/app/_components/view-comments";
import LightboxWrapper from "@/app/_components/lightbox-component";

type PostParams = { locale: string; slug: string };

// Utility to strip HTML tags for metadata
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "");
}

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
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title} // keep styled HTML here
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            locale={locale}
          />
          <div className="flex justify-center">
            <div className="prose prose-lg prose-invert max-w-3xl w-full px-4 text-white prose-img:rounded-lg prose-img:max-xl 
            prose-a:text-red-500 hover:prose-a:text-red-400 transition-colors duration-200 prose-video:rounded-lg prose-blockquote:border-l-red-500 ">
              <LightboxWrapper>{post.content}</LightboxWrapper>
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

  const plainTitle = stripHtml(post.title);

  return {
    title: `${plainTitle} | Kyle's Japan Life`,
    openGraph: {
      title: plainTitle,
      images: [post.ogImage.url],
    },
  };
}

// Generate static params for *all* locales
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
