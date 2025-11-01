"use client";

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import the zoom plugin + styles
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function LightboxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const imgEls = Array.from(container.querySelectorAll("img"));
    const urls = imgEls.map((img) => img.src);
    setImageUrls(urls);

    const handleClick = (i: number) => () => {
      setIndex(i);
      setOpen(true);
    };

    const handlers = imgEls.map((img, i) => {
      img.style.cursor = "zoom-in";
      const handler = handleClick(i);
      img.addEventListener("click", handler);
      return { img, handler };
    });

    return () => {
      handlers.forEach(({ img, handler }) => {
        img.removeEventListener("click", handler);
      });
    };
  }, [children]);

  return (
    <>
      <div ref={containerRef}>{children}</div>
      {open && imageUrls.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={imageUrls.map((src) => ({ src }))}
          plugins={[Zoom]}
          // optional: tweak zoom behavior
          zoom={{
            maxZoomPixelRatio: 3, // how far user can zoom
            zoomInMultiplier: 1.5,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true,
         }}
        />
      )}
    </>
  );
}
