"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProfileCard, ProfileCardWithBookMark } from "./common";
import { formatSanityDate } from "@/components/website/utils/functions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IPost } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import { Calendar, ArrowRight } from "lucide-react";

// Image component with loading state and error handling
const BlogImage = ({
  src,
  alt,
  className,
  aspectRatio = "16/10",
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "editorial-image-container relative overflow-hidden bg-[hsl(var(--editorial-warm-gray))]",
        className
      )}
      style={{ aspectRatio }}
    >
      {isLoading && (
        <div className="absolute inset-0 skeleton animate-pulse" />
      )}
      <Image
        src={hasError ? "/no-image.png" : src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-all duration-700",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

// Featured Hero Card - Large prominent card
export const BlogCardFeatured: React.FC<{
  blog: IPost;
  variant?: "dark" | "light";
}> = ({ blog, variant = "dark" }) => {
  const isComic = blog.postType === "comic";
  const isDark = variant === "dark";

  return (
    <Link href={`/blogs/${blog?.slug.current}`} className="group block">
      <article className="editorial-card relative overflow-hidden">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <BlogImage
            src={imageUrl(blog?.mainImage)}
            alt={blog?.title || "Blog image"}
            className="w-full h-full"
            aspectRatio="auto"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {isComic && (
                <span className="editorial-badge bg-blue-500/90 text-white">
                  Comic
                </span>
              )}
              {blog.categories?.slice(0, 2).map((category, index) => (
                <span key={index} className="editorial-badge bg-white/90 text-foreground">
                  {category.title}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h2 className="font-playfair text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 group-hover:text-primary transition-colors">
              {blog?.title}
            </h2>
            
            {/* Excerpt */}
            <p className="font-dm-sans text-white/80 text-sm md:text-base max-w-2xl mb-4 line-clamp-2">
              {blog?.excerpt}
            </p>
            
            {/* Meta */}
            <div className="flex items-center gap-4 text-white/70 text-sm font-dm-sans">
              {blog?.author && (
                <span className="font-medium text-white">{blog.author.name}</span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatSanityDate(blog?.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

// Editorial Card with Image - Standard blog card
export const BlogCardEditorial: React.FC<{
  blog: IPost;
  showExcerpt?: boolean;
  size?: "default" | "compact";
}> = ({ blog, showExcerpt = true, size = "default" }) => {
  const isComic = blog.postType === "comic";
  const isCompact = size === "compact";

  return (
    <Link href={`/blogs/${blog?.slug.current}`} className="group block h-full">
      <article className="editorial-card h-full flex flex-col">
        {/* Image */}
        <BlogImage
          src={imageUrl(blog?.mainImage)}
          alt={blog?.title || "Blog image"}
          className={cn("w-full", isCompact ? "aspect-[4/3]" : "aspect-[16/10]")}
        />
        
        {/* Content */}
        <div className={cn("flex flex-col flex-1", isCompact ? "p-4" : "p-5")}>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {isComic && (
              <span className="text-xs font-dm-sans font-medium text-blue-600 uppercase tracking-wider">
                Comic
              </span>
            )}
            {blog.categories?.slice(0, 1).map((category, index) => (
              <span
                key={index}
                className="text-xs font-dm-sans font-medium text-primary uppercase tracking-wider"
              >
                {category.title}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3 className={cn(
            "font-playfair font-semibold text-foreground leading-snug group-hover:text-primary transition-colors mb-2",
            isCompact ? "text-lg line-clamp-2" : "text-xl line-clamp-3"
          )}>
            {blog?.title}
          </h3>
          
          {/* Excerpt */}
          {showExcerpt && !isCompact && (
            <p className="font-dm-sans text-muted-foreground text-sm line-clamp-2 mb-4">
              {blog?.excerpt}
            </p>
          )}
          
          {/* Meta - pushed to bottom */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {blog?.author?.image && (
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={imageUrl(blog.author.image)}
                    alt={blog.author.name || "Author"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-xs font-dm-sans font-medium text-foreground">
                {blog?.author?.name}
              </span>
            </div>
            <span className="text-xs font-dm-sans text-muted-foreground">
              {formatSanityDate(blog?.publishedAt)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

// Horizontal Card for secondary placement
export const BlogCardHorizontal: React.FC<{
  blog: IPost;
  variant?: "dark" | "light";
}> = ({ blog, variant = "light" }) => {
  const isDark = variant === "dark";
  const isComic = blog.postType === "comic";

  return (
    <Link href={`/blogs/${blog?.slug.current}`} className="group block">
      <article className={cn(
        "flex gap-4 py-4 border-b transition-colors",
        isDark ? "border-white/10" : "border-gray-100"
      )}>
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category */}
          <div className="flex gap-2 mb-2">
            {blog.categories?.slice(0, 1).map((category, index) => (
              <span
                key={index}
                className={cn(
                  "text-xs font-dm-sans font-medium uppercase tracking-wider",
                  isDark ? "text-primary" : "text-primary"
                )}
              >
                {category.title}
              </span>
            ))}
            {isComic && (
              <span className="text-xs font-dm-sans font-medium text-blue-500 uppercase tracking-wider">
                Comic
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className={cn(
            "font-playfair text-lg font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2",
            isDark ? "text-white" : "text-foreground"
          )}>
            {blog?.title}
          </h3>
          
          {/* Meta */}
          <div className={cn(
            "flex items-center gap-2 text-xs font-dm-sans",
            isDark ? "text-white/60" : "text-muted-foreground"
          )}>
            <span>{blog?.author?.name}</span>
            <span>·</span>
            <span>{formatSanityDate(blog?.publishedAt)}</span>
          </div>
        </div>
        
        {/* Arrow */}
        <div className={cn(
          "flex items-center justify-center w-8 opacity-0 group-hover:opacity-100 transition-opacity",
          isDark ? "text-white" : "text-foreground"
        )}>
          <ArrowRight className="h-4 w-4" />
        </div>
      </article>
    </Link>
  );
};

// Legacy components for backward compatibility
export const BlogCardMain: React.FC<{
  blog: IPost;
  bg?: "background" | "foreground";
}> = ({ bg = "background", blog }) => {
  return <BlogCardEditorial blog={blog} />;
};

export const BlogListHero = ({ blogs }: { blogs: IPost[] }) => {
  return (
    <div className="w-full space-y-0">
      {blogs.map((blog, index) => (
        <BlogCardHorizontal key={index} blog={blog} variant="dark" />
      ))}
    </div>
  );
};

export const BlogCardPrimary: React.FC<{
  size?: "small" | "large";
  blog: IPost;
}> = ({ size = "large", blog }) => {
  return <BlogCardEditorial blog={blog} size={size === "small" ? "compact" : "default"} showExcerpt={size === "large"} />;
};
