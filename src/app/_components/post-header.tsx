import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  locale: string;
};

export async function PostHeader({ title, coverImage, date, author, locale }: Props) {
  return (
    <>
      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="inline-block mb-5 md:mb-4 md:-mt-10 hover:text-red-500">
          <Link href={`/${locale}/about`}>
            <Avatar name={author.name} picture={author.picture} />
          </Link>
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} locale={locale} />
        </div>
      </div>
    </>
  );
}
