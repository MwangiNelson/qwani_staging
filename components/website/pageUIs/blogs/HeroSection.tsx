"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BlogCardFeatured,
  BlogCardHorizontal,
} from "../../shared/cards/blogs";
import {
  formatSanityText,
} from "../../utils/functions";
import { IBlogsPage, IPost } from "@/utils/data_types";
import { Button } from "@/components/ui/button";
import { PenIcon, Sparkles } from "lucide-react";
import Link from "next/link";

interface IHeroSectionProps {
  content: IBlogsPage;
  blogs: IPost[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection({ content, blogs }: IHeroSectionProps) {
  const featuredBlog = blogs[0];
  const secondaryBlogs = blogs.slice(1, 4);

  return (
    <section className="editorial-bg-charcoal">
      {/* Header */}
      <div className="web-px pt-28 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="relative inline-flex items-center gap-2 text-primary text-sm font-dm-sans font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Sparkles className="h-4 w-4 animate-[gentle-float_3s_ease-in-out_infinite]" />
            Stories & Insights
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-0 h-[1px] bg-primary animate-[draw-line_0.8s_ease-out_0.5s_forwards] w-0" />
          </motion.span>

          <motion.h1
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            {formatSanityText(content.heroTitle, "text-white")}
          </motion.h1>
        </div>
      </div>

      {/* Featured Content */}
      <div className="web-px pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Featured — fade up */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {featuredBlog && <BlogCardFeatured blog={featuredBlog} />}
          </motion.div>

          {/* Secondary Stories — staggered slide-in from right */}
          <div className="space-y-0">
            <motion.div
              className="pb-2 mb-4 border-b border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className="font-dm-sans text-xs font-semibold text-white/50 uppercase tracking-wider">
                More Stories
              </h3>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              {secondaryBlogs.map((blog, index) => (
                <motion.div
                  key={index}
                  variants={slideInRight}
                  className="border-l-2 border-transparent hover:border-primary pl-0 hover:pl-2 transition-all duration-300"
                >
                  <BlogCardHorizontal blog={blog} variant="dark" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed z-50 bottom-8 right-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg hover:scale-105 transition-transform"
            asChild
          >
            <Link href="/blogs/how-to-publish-with-qwani">
              <PenIcon className="h-5 w-5" />
              <span className="sr-only">How to publish</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
