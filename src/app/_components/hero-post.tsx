import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="font-bold mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="inline-block text-red-500 hover:text-red-300 transform transition-transform hover:scale-105 hover:-rotate-1">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <Link href={`/posts/${slug}`} className="text-lg leading-relaxed mb-4">
          <p className="inline-block transform transition-transform hover:scale-y-105 text-lg leading-relaxed mb-4">{excerpt}</p> </Link>
          <Link href="/about" className="inline-block hover:text-red-500">
          <Avatar name={author.name} picture={author.picture} />
          </Link>
        </div>
      </div>
    </section>
  );
}
