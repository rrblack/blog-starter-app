"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function CommentSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const slug_id = window.location.pathname.split("/").pop(); // Get the slug from the URL
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting comment:", { name, message, slug_id});
    setStatus("loading");
  
    try {
      // Use the supabase client to insert data
      // Replace 'comments' with your actual table name
      const { error } = await supabase
        .from("comment_section") 
        .insert([{ name, message,slug_id }]);

      if (error) {
        // Handle potential database errors
        throw error;
      }

      setStatus("success");
      // Clear form on success
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setStatus("error");
    }
  };


  return (
     <form
      onSubmit={handleSubmit}
      className="rounded px-8 pt-6 pb-8 mb-4 max-w-2xl center mx-auto"
    >
      <h2 className="text-center text-2xl text-red-500 font-semibold">
        Leave a comment
      </h2>
      <div className=" ">
        <h1 className="text-xl"> Name: </h1>
        <input
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 items-center h-14 pr-0.5 border border-red-600 rounded caret-red-700 outline-none px-4 disabled:border-slate-400 disabled:bg-slate-100 text-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h1 className="text-xl"> Message: </h1>
        <textarea 
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 h-40 w-full border border-red-600 rounded caret-red-700 outline-none px-4 disabled:border-slate-400 disabled:bg-slate-100 text-black"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
        />
        <button
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline h-14 disabled:bg-slate-400"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "..." : "Submit"}
        </button>
        {status === "error" && <p className="text-red-500">Failed to send comment. Please try again.</p>}
        {status === "success" && <p className="text-green-500"><b>Comment successfully submitted! </b><br/>
          Your comment will appear shortly after being approved by an admin.</p>}
      </div>
    </form>
  );
}