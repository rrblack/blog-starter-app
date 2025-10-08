"use client";
import { useState } from "react";
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const [visibleCount, setVisibleCount] = useState(2); // show 3 initially

  const showMore = () => {
    setVisibleCount((prev) => prev + 3); // reveal 3 more each click
  };

  return (
    <section>
      <h2 className="mb-8 text-5xl -mt-8 md:text-7xl font-bold tracking-tighter leading-tight text-red-500">
        More Stories
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
            className="px-11 py-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
}

