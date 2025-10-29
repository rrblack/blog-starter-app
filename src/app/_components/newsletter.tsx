"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const t = useTranslations('Newsletter');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setStatus("error");
        setMessage(t(data.error));
        return;
      }

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "An error occurred.");
        return;
      }

      setStatus("success");
      setMessage(t('subscribed'));
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(t('error'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded px-8 pt-6 pb-8 mb-4 max-w-2xl center mx-auto"
    >
      <h2 className="text-center text-2xl text-red-500 break-keep break-words font-semibold whitespace-normal">
        {t('stay_updated')}
      </h2>
      <div className="mt-4 flex">
        <input
          className="grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-red-600 items-center h-14 pr-0.5 border border-red-600 rounded caret-red-700 outline-none px-4 disabled:border-slate-400 disabled:bg-slate-100 text-black"
          type="email"
          placeholder= {t('type_email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          required
        />
        <button
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-14 disabled:bg-slate-400 break-keep break-words whitespace-normal"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "..." : t('subscribe')}
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

export default SubscribeForm;