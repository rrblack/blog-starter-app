"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

type MDXImageProps = ImageProps & {
  className?: string;
  width?: number;
  height?: number;
};

export function MDXImage({
  width = 700,
  height = 475,
  className,
  ...props
}: MDXImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={`sm:mx-0 ${className ?? ""}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
        {isLoading && <div className="absolute inset-0 skeleton" />}
        <Image
          width={width}
          height={height}
          {...props}
          unoptimized
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
