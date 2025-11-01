"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProseWithLightbox({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<{ src: string }[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const imgs = document.querySelectorAll<HTMLImageElement>(".prose img");
    const sources = Array.from(imgs).map((img) => ({ src: img.src }));
    setSlides(sources);

    imgs.forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.onclick = () => {
        setIndex(i);
        setOpen(true);
      };
    });
  }, [children]);

  return (
    <>
      <div className="prose prose-lg prose-invert max-w-3xl w-full px-4 text-white">
        {children}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} index={index} slides={slides} />
    </>
  );
}