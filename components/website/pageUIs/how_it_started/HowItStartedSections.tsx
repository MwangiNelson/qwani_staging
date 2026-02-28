"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IHowItStarted, ISanityAsset } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import { cn } from "@/lib/utils";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import Portable_Text_Editor from "../../shared/portable_text_editor";
import { TracingBeam } from "@/components/aceternity/tracing-beam";
import {
  ScrollReveal,
  ParallaxImage,
} from "@/components/website/shared/AnimationPrimitives";

type Props = {
  content: IHowItStarted;
};

// Cinematic hero with title that draws you in
export const HowItStartedHero = ({ content }: Props) => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-foreground">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.3), transparent 60%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 text-center web-px max-w-4xl mx-auto">
        <motion.span
          className="inline-block text-primary text-xs font-dm-sans font-medium tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Origin Story
        </motion.span>

        <motion.h1
          className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-background leading-[1.1] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {content.title}
        </motion.h1>

        <motion.p
          className="font-dm-sans italic text-background/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {content.description}
        </motion.p>

        {/* Animated line drawing down */}
        <motion.div
          className="mx-auto mt-12 w-px bg-primary/40 origin-top"
          initial={{ scaleY: 0, height: 60 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href="#gallery"
            className="inline-flex flex-col items-center gap-1 text-background/40 hover:text-background/70 transition-colors"
          >
            <span className="font-dm-sans text-[10px] uppercase tracking-[0.3em]">
              Begin
            </span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Photo strip — editorial mosaic instead of a boring carousel
export const HowItStartedGallery = ({ content }: Props) => {
  const images = content.hero_images;
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="bg-foreground py-4 pb-16">
      <div className="web-px">
        {/* Desktop: balanced grid layout */}
        <div className="hidden md:grid grid-cols-12 gap-3 max-w-6xl mx-auto">
          {images.map((img, index) => {
            const isActive = index === activeImage;
            // Evenly distribute columns for balanced appearance
            const colCount = images.length;
            const span = colCount <= 3 ? 4 : colCount <= 4 ? 3 : Math.max(2, Math.floor(12 / Math.min(colCount, 6)));
            // Uniform aspect ratio for symmetry
            const aspect = "aspect-[4/3]";

            return (
              <motion.div
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-sm cursor-pointer group",
                  aspect
                )}
                style={{ gridColumn: `span ${span}` }}
                onClick={() => setActiveImage(index)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Image
                  src={imageUrl(img)}
                  alt={`How it started - ${index + 1}`}
                  fill
                  className={cn(
                    "object-cover transition-all duration-700",
                    isActive ? "brightness-100" : "brightness-75 group-hover:brightness-90"
                  )}
                  sizes="(max-width: 1200px) 50vw, 33vw"
                />
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: swipeable gallery with indicator */}
        <div className="md:hidden">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={imageUrl(images[activeImage])}
                  alt={`How it started - ${activeImage + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImage((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeImage
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-background/30"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Main content with Tracing Beam sidebar
export const HowItStartedBody = ({ content }: Props) => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="web-px">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-dm-sans text-primary text-xs font-medium tracking-[0.25em] uppercase">
              The Journey
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground mt-3">
              How It All Began
            </h2>
            <div className="editorial-divider mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <TracingBeam>
          <div className="prose prose-lg max-w-none font-dm-sans prose-headings:font-playfair prose-headings:font-semibold prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-lg prose-blockquote:border-l-primary prose-blockquote:font-playfair prose-blockquote:italic">
            <Portable_Text_Editor classNames="w-full" body={content.body} />
          </div>
        </TracingBeam>
      </div>
    </section>
  );
};
