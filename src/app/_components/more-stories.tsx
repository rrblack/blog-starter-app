"use client";
import { useState } from "react";
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import { useTranslations } from "next-intl";
import { ArchiveNavigation } from "./archive-navigation";


type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const [visibleCount, setVisibleCount] = useState(2); // show 2 initially
  const [buttonClicked, setClickedButton] = useState(false) 
  const t = useTranslations("More");

  const showMore = () => {
    setVisibleCount((prev) => prev + 2); // reveal 3 more each click
    setClickedButton(true)
  };

  return (
    <section>
      <h2 className="mb-8 text-5xl -mt-8 md:text-7xl font-bold tracking-tighter leading-tight text-red-500">
        {t("more_stories")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-22 gap-y-12 md:gap-y-12 mb-12">
        {posts.slice(0, visibleCount).map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
      {visibleCount < posts.length && (
        <div className="flex justify-center">
          <button
            onClick={showMore}
            className="px-11 py-4 bg-red-700 text-white font-semibold rounded hover:bg-red-800 transition"
          >
            {t("see_more")}
          </button>
        </div>
      )}
      <div className="flex-auto md:py-12 py-12">
          {buttonClicked===true && (
          <ArchiveNavigation/>
        )}
        </div>
    </section>
  );
}

