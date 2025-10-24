"use client";

import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const [isLoading, setLoading] = useState(true);

  const image = (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
  {isLoading && (
    <div className="absolute inset-0 skeleton" />
  )}
  <Image
    src={src}
    alt={`Cover Image for ${title}`}
    fill
    className={cn(
      "object-cover transition-opacity duration-500",
      isLoading ? "opacity-0" : "opacity-100"
    )}
    sizes="100vw"
    onLoadingComplete={() => setLoading(false)}
  />
</div>

  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
