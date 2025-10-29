"use client";

import { useState } from "react";
import cn from "classnames";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  // optional onClick passed by parent (e.g., setLocaleCookie)
  onClick?: () => void;
  className?: string;
};

const CoverImage = ({ title, src, onClick, className }: Props) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={`sm:mx-0 ${className ?? ""}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
        {isLoading && <div className="absolute inset-0 skeleton" />}
        <Image
          src={src}
          alt={`Cover Image for ${title}`}
          fill
          className={cn(
            "object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          sizes="100vw"
          onLoad={() => setLoading(false)}
          // allow parent to receive clicks even if wrapped in Link
          onClick={onClick}
          style={{ cursor: onClick ? "pointer" : undefined }}
        />
      </div>
    </div>
  );
};

export default CoverImage;