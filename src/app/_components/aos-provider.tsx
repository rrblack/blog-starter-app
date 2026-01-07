"use client";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import Script from "next/script";

export default function AOSProvider({ children } : {children: ReactNode}) {
  const [aosLoaded, setAos] = useState(false);

  useEffect(() => {
    if (aosLoaded && typeof window !== "undefined" && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    }
  }, [aosLoaded]);

  return (
    <>
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      <Script
        src="https://unpkg.com/aos@next/dist/aos.js"
        onLoad={() => setAos(true)}
      />
      {children}
    </>
  );
}