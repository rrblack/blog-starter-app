import { Post } from "@/interfaces/post";
import fs from "fs";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { MDXImage } from "@/app/_components/mdximage";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export async function getPostBySlug(
  slug: string,
  locale: string
): Promise<Post | null> {
  const fileName = `${slug}.${locale}.mdx`;
  const fullPath = join(postsDirectory, fileName);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { frontmatter, content } = await compileMDX({
    source: fileContents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins: [rehypeHighlight] },
    },
    components: {
      Image: MDXImage,
    },
  });

  return {
    ...frontmatter,
    slug,
    content,
  } as Post;
}

export async function getAllPosts(locale: string): Promise<Post[]> {
  const slugs = getAllSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, locale))
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllSlugs(): string[] {
  const files = getPostSlugs();
  return Array.from(
    new Set(files.map((f) => f.replace(/\.(en|ja)\.mdx$/, "")))
  );
}