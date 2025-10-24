"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";


export default function CommentSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const supabase = createClient();
  const params = useParams();
  const slug_id = params.slug as string;
  const t = useTranslations("Comments")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting comment:", { name, message, slug_id});
    setStatus("loading");
  
    try {
      // Use the supabase client to insert data
      const { error } = await supabase
        .from("comment_section") 
        .insert([{ name, message, slug_id }]);

      if (error) {
        throw error;
      }

      setStatus("success");
      // Clear form on success
      setName("");
      setMessage("");
      window.location.reload();
      
    } catch (error) {
      console.error(t('comment_error'), error);
      setStatus("error");
    }
  };


  return (
     <form
      onSubmit={handleSubmit}
      className="rounded px-8 pt-6 pb-8 mb-4 max-w-2xl center mx-auto"
    >
      <h2 className="text-center text-2xl text-red-500 font-semibold">
        {t('leave_comment')}
      </h2>
      <div>
        <h1 className="text-xl"> {t('name')}: </h1>
        <input
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 items-center h-14 pr-0.5 border border-red-600 rounded caret-red-700 outline-none px-4 disabled:border-slate-400 disabled:bg-slate-100 text-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h1 className="text-xl"> {t('comment_message')}: </h1>
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
          {status === "loading" ? "..." : t('submit')}
        </button>
        {status === "error" && <p className="text-red-500">{t('comment_error')}</p>}
        {status === "success" && <p className="text-green-500"><b>{t('comment_successful')} </b><br/>
          {t('comment_will_display_soon')}.</p>}
      </div>
    </form>
  );
}