"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FullscreenPhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FullscreenPhoto({ src, alt, className }: FullscreenPhotoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Inline photo with click-to-expand */}
      <div
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-lg",
          className
        )}
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && open()}
        aria-label={`View full photo of ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={1200}
          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          priority
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3"
            whileHover={{ scale: 1.1 }}
          >
            <Maximize2 className="h-5 w-5 text-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            {/* Close button — high z-index so it sits above navbar */}
            <motion.button
              className="fixed top-20 right-6 z-[200] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
              onClick={close}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.15 }}
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Full image */}
            <motion.div
              className="relative w-[90vw] h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            <motion.p
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-dm-sans text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {alt} — Click anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
