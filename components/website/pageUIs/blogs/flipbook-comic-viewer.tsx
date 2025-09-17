"use client";

import HTMLFlipBook from "react-pageflip";
import { imageUrl } from "@/sanity/lib/client";
import { IComicPanel } from "@/utils/data_types";
import { useEffect, useMemo, useRef, useState } from "react";

interface FlipbookComicViewerProps {
  panels: IComicPanel[];
  title: string;
}

export default function FlipbookComicViewer({
  panels,
  title,
}: FlipbookComicViewerProps) {
  const bookRef = useRef<any>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [containerHeight, setContainerHeight] = useState<number>(600);

  useEffect(() => {
    const updateSize = () => {
      const vw = Math.min(
        typeof window !== "undefined" ? window.innerWidth : 800,
        1200
      );
      const vh = typeof window !== "undefined" ? window.innerHeight : 600;
      // Use 92% of viewport height to avoid cut off under headers/footers
      const width = Math.max(320, Math.floor(vw * 0.9));
      const height = Math.max(420, Math.floor(vh * 0.92));
      setContainerWidth(width);
      setContainerHeight(height);
    };
    updateSize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  const pages = useMemo(
    () =>
      panels.map((panel) => (
        <div
          key={panel._key}
          className="w-full h-full flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl(panel.image.asset || panel.image)}
            alt={panel.caption || "Comic page"}
            className="max-w-full max-h-full object-cover min-h-[420px]"
            loading="lazy"
          />
        </div>
      )),
    [panels]
  );

  if (!panels || panels.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No comic panels available</p>
      </div>
    );
  }

  return (
    <div
      className="w-full flex justify-center overflow-visible py-2"
      style={{ height: containerHeight }}
    >
      <HTMLFlipBook
        ref={bookRef}
        width={Math.max(320, Math.floor(containerWidth / 2))}
        height={Math.max(420, containerHeight)}
        size="fixed"
        style={{ overflow: "visible", height: containerHeight }}
        startPage={0}
        startZIndex={0}
        autoSize={false}
        minWidth={300}
        maxWidth={1200}
        minHeight={400}
        maxHeight={4000}
        drawShadow={true}
        flippingTime={800}
        usePortrait={true}
        maxShadowOpacity={0.5}
        clickEventForward={true}
        useMouseEvents={true}
        renderOnlyPageLengthChange={false}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-xl"
      >
        {pages}
      </HTMLFlipBook>
    </div>
  );
}
