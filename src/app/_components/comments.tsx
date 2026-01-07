"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Spinner from "./comment_spinner";
import { useTranslations, useLocale } from "next-intl";

const supabase = createClient();
const NAME_COOKIE = "COMMENTER_NAME";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type Comment = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  slug_id: string;
  parent_id: string;
  reply?: Comment[];
};

export default function CommentSection() {
  // Form state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
 

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  // Comments viewer state
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadStatus, setLoadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingCommentId, setLoadingCommentId] = useState<string | null>(null);
  const [activeReplyID, setActiveReplyID] = useState("");

  //Translation holder
  const [translationHolder, setTranslationHolder] = useState("");
  const[translatedComment, setTranslatedComment] = useState<boolean>(false);
  const[translatedCommentID, setTranslatedCommentID] = useState("");

  const params = useParams();
  const slug_id = params.slug as string;
  const t = useTranslations("Comments");
  const locale = useLocale();

  // Helper to set name cookie
  function setNameCookie(name?: string, replyName?: string) {
    try {
      const value = name ?? replyName ?? "";
      document.cookie = `${NAME_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax; Secure`;
    } catch {}
  }

  // Read cookie and load comments on mount
  useEffect(() => {
    const cookieValue = document.cookie.split("; ");
    const nameCookie = cookieValue.find((c) => c.startsWith(`${NAME_COOKIE}=`));
    if (nameCookie) {
      const savedName = decodeURIComponent(nameCookie.split("=")[1]);
      setName(savedName);
      setReplyName(savedName)
    }
    fetchComments();
  }, []);

  async function fetchComments() {
    setLoadStatus("loading");
    const { data, error } = await supabase
      .from('comment_section')
      .select('*')
      .eq('published', true)
      .eq('slug_id', slug_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      setLoadStatus("error");
    } else {
      // Organize comments into parent-child structure.
      const commentMap = new Map<string, Comment>();
      const topLevelComments: Comment[] = [];

      // Create map of all comments with empty replies array.
      data.forEach(comment => {
        commentMap.set(comment.id, {...comment, reply: [] });
      });

      // Organize into tree structure
      data.forEach(comment => {
        const commentWithReplies = commentMap.get(comment.id)!;
        if (comment.parent_id) {
          // Add reply
          const parent = commentMap.get(comment.parent_id);
          if (parent) {
            parent.reply!.push(commentWithReplies)
          }
        } else {
          // Top level comment
          topLevelComments.push(commentWithReplies);
        }
      });

      // Sort replies 
      topLevelComments.forEach(comment => {
        comment.reply?.sort((a,b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      })

      setComments(topLevelComments);
      setLoadStatus("success");
    }
  }

  async function translateComments(id: string, message: string, locale: string) {
  setLoadingCommentId(id);
  let translate_into = locale === "en" ? "EN" : "JA";

  try {
    const res = await fetch("/api/comment-translation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, message, translate_into }),
    });

    const data = await res.json();

    if (data.translation) {
      setComments((prev) =>
        prev.map((c) => {
          // Check if it's the parent comment
          if (c.id === id) {
            return { ...c, message: data.translation };
          }
          // Check if it's a reply
          if (c.reply) {
            return {
              ...c,
              reply: c.reply.map(r =>
                r.id === id ? { ...r, message: data.translation } : r
              )
            };
          }
          return c;
        })
      );
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoadingCommentId(null);
  }
}

  function isEnglish(text: string): boolean {
    const asciiChars = text.split("").filter((char) => char.charCodeAt(0) <= 127);
    return asciiChars.length / text.length > 0.9;
  }

  function isJapanese(text: string): boolean {
    const nonAsciiChars = text.split("").filter((char) => char.charCodeAt(0) > 127);
    return nonAsciiChars.length / text.length > 0.5;
  }
  
   // Parent comment reply function
  const handleReplySubmit= async (e: FormEvent<HTMLFormElement>, parentID: string) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      const {error} = await supabase
        .from("comment_section")
        .insert([{
           name: replyName,
           message: replyMessage, 
           slug_id, 
           parent_id: parentID}]);

        if (error) {
          throw error;
        }
        // Clear the form and refresh
        setSubmitStatus("success")
        setReplyMessage("")
        setActiveReplyID("")
        setNameCookie(replyName)
        setTimeout(() => setSubmitStatus("idle"), 3000);
        await fetchComments();
    } catch (error) {
      console.error("Error submitting reply:", error);
      setSubmitStatus("error")
    }
  };
  // Normal reply function
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting comment:", { name, message, slug_id });
    setSubmitStatus("loading");

    try {
      const { error } = await supabase
        .from("comment_section")
        .insert([{ name, message, slug_id }]);

      if (error) {
        throw error;
      }

      setSubmitStatus("success");
      setNameCookie(name);
      setMessage("");
      
      // Refresh comments instead of full page reload
      await fetchComments();
      
      // Scroll to the comments section
      document.getElementById('comments_section')?.scrollIntoView({ behavior: 'smooth' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error(t('comment_error'), error);
      setSubmitStatus("error");
    }
  };

 return (
    <div>
      {/* Comments Viewer */}
      <div id="comments_section">
        <h1 className="text-center font-bold text-5xl">
          {loadStatus === "loading" && <Spinner />}
          {loadStatus === "error" && t("comment_loading_comments")}
          {loadStatus === "success" && (
            comments.length === 0
              ? t("first")
              : comments.length === 1
              ? <>
                <span className="text-red-500">1</span> {t("one_comment")}
                </>
              : <>
              <span className="text-red-500">{comments.length} </span> {t("multiple_comments")}
              </> 
          )}
        </h1>
        {loadStatus === "success" && comments.map((comment) => (
          <div key={comment.id}>
            <div className="max-w-2xl mx-auto my-10 p-5 border rounded border-red-500">
              <div className="flex items-center gap-2 ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>              
              <h1 className="text-2xl text-red-600 font-semibold">{comment.name}</h1>
              </div>
              <h2 className="text-sm text-gray-400 mb-1">
                {new Date(comment.created_at).toLocaleString()}
              </h2>
              <main className="text-white whitespace-pre-wrap">
                {loadingCommentId === comment.id ? (
                  <Spinner />
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

              {/* Reply feature */}
              <div> 
                <br></br>
                {activeReplyID !== comment.id && (
                <button 
                  className="text-red-500"
                  type="button"
                  onClick={() => setActiveReplyID(comment.id)}
                > 
                  {t('reply_to_comment')}
                </button> )}
                {activeReplyID === comment.id && (
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)} >
                    <div className="my-4 p-5 border rounded border-red-500">
                      <h1 className="text-red-500 text-2xl"> Replying to {comment.name} </h1> 
                      <h1 className="text-xl"> {t('name')}: </h1>
                      <input
                        className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 items-center h-14 pr-0.5 border border-red-600 rounded caret-red-700 outline-none px-4 disabled:border-slate-400 disabled:bg-slate-100 text-black"
                        type="text"
                        value={replyName}
                        onChange={(e) => setReplyName(e.target.value)}
                        required
                      />
                      <h1 className="text-xl"> {t('comment_message')}: </h1>
                      <textarea
                        className="w-full transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 h-40 border border-red-600 rounded caret-red-700 outline-none px-4 py-2 disabled:border-slate-400 disabled:bg-slate-100 text-black"
                        onChange={(e) => setReplyMessage(e.target.value)}
                        value={replyMessage}
                        required
                      />
                      <div className="flex gap-4">
                        <button
                          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline h-14 disabled:bg-slate-400"
                          type="submit"
                          disabled={submitStatus === "loading"}
                        >
                          {submitStatus === "loading" ? "..." : t('send_reply')}
                        </button>
                        {submitStatus === "error" && <p className="text-red-500">{t('comment_error')}</p>}
                        {submitStatus === "success" && (
                          <p className="text-green-500">
                            <b>{t('comment_successful')} </b><br />
                            {t('comment_will_display_soon')}.
                          </p>
                        )}
                        <button
                          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline h-14 disabled:bg-slate-400"
                          type="button"
                          onClick={() => {
                            setActiveReplyID("");
                          }}
                        >
                          {t('cancel_reply')}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Render Replies INSIDE parent comment */}
              {comment.reply && comment.reply.length > 0 && (
                <div className="mt-6">
                  {comment.reply.map((reply) => (
                    <div 
                      key={reply.id} 
                      className="ml-4 mt-4 p-4 border-l-4 border-red-500 pl-4 bg-gray-900 rounded"
                    >
                       <div className="flex items-center gap-2"> 
                      {reply.name === "Kyle" && (
                        <img className="rounded-full w-8 h-8" src="/assets/blog/authors/kyle.jpg" />
                      )}
                      {reply.name !== "Kyle" && (
                        <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                          </svg>
                      </div>
                      )}
                      <h1 className="text-xl text-red-600 font-semibold">{reply.name}</h1>
                      </div>
                      <h2 className="text-sm text-gray-400 mb-1">
                        {new Date(reply.created_at).toLocaleString()}
                      </h2>
                      <main className="text-white whitespace-pre-wrap">
                        {loadingCommentId === reply.id ? <Spinner /> : reply.message}
                      </main>
                      {locale === "ja" && isEnglish(reply.message) && (
                        <button
                          className="text-red-500 mt-2"
                          type="button"
                          onClick={() => translateComments(reply.id, reply.message, locale)}
                        >
                          コメントを翻訳する
                        </button>
                      )}
                      {locale === "en" && isJapanese(reply.message) && (
                        <button
                          className="text-red-500 mt-2"
                          type="button"
                          onClick={() => translateComments(reply.id, reply.message, locale)}
                        >
                          Translate comment 
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Comment Form */}
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
            disabled={submitStatus === "loading"}
          >
            {submitStatus === "loading" ? "..." : t('submit')}
          </button>
          {submitStatus === "error" && <p className="text-red-500">{t('comment_error')}</p>}
          {submitStatus === "success" && (
            <p className="text-green-500">
              <b>{t('comment_successful')} </b><br />
              {t('comment_will_display_soon')}.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}