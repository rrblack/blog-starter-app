"use client";

export default function GlobalError({ error }: { error: Error }) {
  console.error("Global error caught:", error);
  return <h1>500 – Something broke</h1>;
}