import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    img: (props) => (
      <Image
        {...props}
        alt={props.alt || ""}
        width={800}
        height={600}
        className="rounded-lg"
      />
    ),
    a: (props) => (
      <a {...props} className="text-blue-600 underline hover:text-blue-800" />
    ),
    ...components,
  };
}