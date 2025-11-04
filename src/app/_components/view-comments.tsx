"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Spinner from "./comment_spinner";
import { useTranslations, useLocale } from "next-intl";

const supabase = createClient();

type Comment = {
  id: string;
  name: string;
  message: string;
  created_at :string;
  slug_id: string;
};

export default function CommentViewer() {
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useParams();
  const slug_id = params.slug as string;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("Comments");
  const locale = useLocale();
  const [loadingCommentId, setLoadingCommentId] = useState<string | null>(null);


  useEffect(() => {
    fetchComments();
  }, []);
  
  
  async function fetchComments() {
    setStatus("loading");
    const {data, error} = await supabase
      .from('comment_section')
      .select('*')
      .eq('published', true)
      .eq('slug_id', slug_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      setStatus("error");
    } else{
      setComments(data);
      setStatus("success");
    }
  }

  async function translateComments(id: string, message: string, locale: string) {
    setLoadingCommentId(id);
    let translate_into = "";

    if (locale === "en") {
      translate_into = "EN";
    } else {
      translate_into = "JA";
    }
    try {
      const res= await fetch("/api/comment-translation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, message, translate_into }),
      });

      const data = await res.json();

      if (data.translation) {
        setComments((prev) => 
          prev.map((c) => 
            c.id === id ? {...c, message: data.translation } : c 
        )
        );
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoadingCommentId(null)
    }

  };

  function isEnglish(text: string): boolean {
    const asciiChars = text.split("").filter((char) => char.charCodeAt(0) <= 127);
  return asciiChars.length / text.length > 0.9; // 90% ASCII = likely English
}

  function isJapanese(text: string): boolean {
    const nonAsciiChars = text.split("").filter((char) => char.charCodeAt(0) > 127);
  return nonAsciiChars.length / text.length > 0.5; // 50% not ASCII = likely Japanese
}


return (
  <div> 
    <h1 className="text-center font-bold text-5xl">
      {status === "loading" && <Spinner />}
      {status === "error" && t("comment_loading_comments")}
      {status === "success" && (
        comments.length === 0 
          ? t("first")
          : comments.length === 1
          ? `1 ${t("multiple_comments")}`
          : `${comments.length} ${t("multiple_comments")}`
      )}
    </h1>  
    
    {status === "success" && comments.map((comment) => (
      <div key={comment.id} className="max-w-2xl mx-auto my-10 p-5 border rounded"> 
        <h1 className="text-2xl text-red-600 font-semibold">{comment.name}</h1>
        <h2 className="text-sm text-gray-600 mb-1">
          {new Date(comment.created_at).toLocaleString()}
        </h2>
        <main className="text-white"> 
          {loadingCommentId === comment.id ? (
            <Spinner/>
          ) : (
            comment.message
          )}
        </main>
        {locale === "ja" && isEnglish(comment.message) && (
          <button
            className="text-red-500"
            type="button"
            onClick={() => translateComments(comment.id, comment.message, locale)}
          >
            コメントを翻訳する
          </button>
        )}
        {locale === "en" && isJapanese(comment.message) && (
          <button
            className="text-red-500"
            type="button"
            onClick={() => translateComments(comment.id, comment.message, locale)}
          >
            Translate comment
          </button>
        )}
      </div>
    ))}
  </div>
);
}
