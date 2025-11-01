"use client";

import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    img: ({ src, alt, width, height, ...props }: any) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={Number(width) || 1920}
        height={Number(height) || 1080}
        className="rounded-lg mx-auto"
        unoptimized
        {...props}
      />
    ),
    a: (props: any) => (
      <a {...props} className="text-red-500 hover:text-red-400 transition-colors duration-200" />
    ),
    ...components,
  };
}