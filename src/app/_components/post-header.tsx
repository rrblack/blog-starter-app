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
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="inline-block mb-5 md:mb-4 md:-mt-10 hover:text-red-500">
        <Link href="/about">
          <Avatar name={author.name} picture={author.picture} />
        </Link>
      </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date}/>
        </div>
      </div>
    </>
  );
}
