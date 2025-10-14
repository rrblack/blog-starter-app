import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="inline-block text-red-500 hover:text-red-300 transform transition-transform hover:scale-105 hover:-rotate-1">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <div> <Link href={`/posts/${slug}`} className="text-lg leading-relaxed mb-4">
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p></Link>
      </div>
    </div>
  );
}
