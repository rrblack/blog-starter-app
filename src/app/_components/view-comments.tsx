"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

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

  useEffect(() => {
    fetchComments();
  }, []);
  
  async function fetchComments() {
    const {data, error} = await supabase
      .from('comment_section')
      .select('*')
      .eq('published', true)
      .eq('slug_id', window.location.pathname.split("/").pop())
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
    } else{
      setComments(data);
    }
  }

  return (
    <div> <h1 className="text-center text-bold text-5xl"> 
    {comments.length > 0 ? `${comments.length} comments` : "Be the first to comment"} </h1>  

    {comments.map((comment) => (
      <div key={comment.id} className="flex-center max-w-2xl mx-auto my-10 p-5 border rounded"> 
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


// export default function CommentViewer({ slug }: { slug: string }) {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState(true);

//   const supabase = createClient();

//   useEffect(() => {
//     const fetchComments = async () => {
//       const { data, error } = await supabase
//         .from("comments")
//         .select("id, name, message, created_at")
//         .eq("slug_id", slug)
//         .eq("published", true)
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Error fetching comments:", error.message);
//       } else {
//         setComments(data || []);
//       }

//       setLoading(false);
//     };

//     fetchComments();
//   }, [slug, supabase]);