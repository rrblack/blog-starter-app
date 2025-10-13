"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { set } from "date-fns";
import Spinner from "./comment_spinner";

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

  return (
    <div> 
    <h1 className="text-center font-bold text-5xl">
      {status === "loading" && <Spinner />}
      {status === "error" && "Error loading comments"}
      {status === "success" &&
    comments.length === 0 
    ? "Be the first to comment"
     : comments.length === 1
     ? "1 comment"
     : comments.length > 1  
     ? `${comments.length} comments`: null} 
      </h1>  
    {status === "success" &&  
      comments.map((comment) => (
      <div key={comment.id} className="max-w-2xl mx-auto my-10 p-5 border rounded"> 
        <h1 className="text-2xl text-red-600 font-semibold"> {comment.name} </h1>
        <h2 className="text-sm text-gray-600 mb-1">
             {new Date(comment.created_at).toLocaleString()}
           </h2>
        <main className="text-white"> {comment.message} </main>
      </div>
    ))}
    </div>
  );
}
