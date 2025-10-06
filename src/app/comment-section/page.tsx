// import { createClient } from '@/lib/supabase/server';
// import { on } from 'events';

// export default async function Comments() {
//   const supabase = await createClient();
//   const { data: comment } = await supabase.from("comment_section").select("id, created_at, email,payload");

"use client";

import { useState, FormEvent } from "react";

export default function CommentSection() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("lib/supabase/server.ts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "An error occurred.");
        return;
      }

      setStatus("success");
      setMessage("Success! Comment successfully sent. Will be visible after approval.");
      setName("");
    } catch (error) {
      setStatus("error");
      setMessage(message);
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
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          required
        />
        <h1 className="text-xl"> Message: </h1>
        <textarea 
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 h-40 w-full border border-red-600 rounded caret-red-700 outline-none px-4 disabled:border-slate-400 disabled:bg-slate-100 text-black"
          type="message"
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
      </div>
      {message && (
        <p
          className={`mt-2 text-sm text-center ${
            status === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}