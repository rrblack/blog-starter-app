import { type Author } from "./author";
import type { ReactNode } from "react";

export type Post = {
  slug: string;
  locale: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: ReactNode;
  preview?: boolean;
};