import { Post } from "@/interfaces/post";
import fs from "fs";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { useMDXComponents } from "@/mdx-components";

const postsDirectory = join(process.cwd(), "_posts");


export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { frontmatter, content } = await compileMDX({
  source: fileContents,
  components: useMDXComponents(),
  options: {
    parseFrontmatter: true,
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  },
});

   

  return {
    ...frontmatter,
    slug: realSlug,
    content,
  } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
    
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.date > b.date ? -1 :  1));
}
