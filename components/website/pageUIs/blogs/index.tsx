"use client";
import * as React from "react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogCardEditorial } from "../../shared/cards/blogs";
import { IPost, IPostCategory } from "@/utils/data_types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export function TrendingBlogsWrapper({ blogs }: { blogs: IPost[] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-4">
        {blogs.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
          >
            <motion.div
              className="animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards", perspective: 800 }}
              whileHover={{ rotateY: 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <BlogCardEditorial blog={item} showExcerpt={false} />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-8">
        <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-10 w-10 border-2 border-foreground/20 hover:border-primary hover:bg-primary hover:text-white transition-all" />
        <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-10 w-10 border-2 border-foreground/20 hover:border-primary hover:bg-primary hover:text-white transition-all" />
      </div>
    </Carousel>
  );
}

export const BlogCategoriesFilter = ({
  blogs,
  categories,
}: {
  blogs: IPost[];
  categories: IPostCategory[];
}) => {
  const categoriesWithBlogs = React.useMemo(() => {
    return categories.filter((category) =>
      blogs.some((blog) =>
        blog.categories?.some((cat) => cat._id === category._id)
      )
    );
  }, [blogs, categories]);

  const [activeCategory, setActiveCategory] = React.useState<IPostCategory | null>(
    categoriesWithBlogs[0] || null
  );

  const activeBlogs = React.useMemo(() => {
    if (!activeCategory) return [];
    return blogs.filter((blog) =>
      blog.categories?.find((category) => category._id === activeCategory._id)
    );
  }, [blogs, activeCategory]);

  if (categoriesWithBlogs.length === 0) return null;

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categoriesWithBlogs.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-5 py-2.5 rounded-full font-dm-sans text-sm font-medium transition-all duration-300",
              activeCategory?._id === category._id
                ? "bg-primary text-white shadow-md"
                : "bg-white text-foreground border border-gray-200 hover:border-primary hover:text-primary"
            )}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Active Category Header */}
      {activeCategory && (
        <div className="text-center">
          <h3 className="font-playfair text-xl font-semibold text-foreground">
            {activeCategory.title}
          </h3>
          <p className="font-dm-sans text-sm text-muted-foreground mt-1">
            {activeBlogs.length} {activeBlogs.length === 1 ? "story" : "stories"}
          </p>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeBlogs.length > 0 ? (
          activeBlogs.map((blog, index) => (
            <div
              key={blog._id || index}
              className="animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
            >
              <BlogCardEditorial blog={blog} size="compact" />
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="font-dm-sans text-muted-foreground">
              No stories found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AllBlogsCards = ({ blogs }: { blogs: IPost[] }) => {
  const INITIAL_COUNT = 12;
  const LOAD_MORE_COUNT = 8;

  const [visibleCount, setVisibleCount] = React.useState(INITIAL_COUNT);
  const [isLoading, setIsLoading] = React.useState(false);

  const visibleBlogs = blogs.slice(0, visibleCount);
  const hasMore = visibleCount < blogs.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate a slight delay for better UX
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, blogs.length));
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="space-y-10">
      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleBlogs.map((blog, index) => (
          <div
            key={blog._id || index}
            className="animate-fade-in opacity-0"
            style={{ animationDelay: `${(index % LOAD_MORE_COUNT) * 0.05}s`, animationFillMode: "forwards" }}
          >
            <BlogCardEditorial blog={blog} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="font-dm-sans px-8 border-2 border-foreground/20 hover:border-primary hover:bg-primary hover:text-white transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Stories
                <span className="ml-2 text-muted-foreground">
                  ({blogs.length - visibleCount} remaining)
                </span>
              </>
            )}
          </Button>
        </div>
      )}

      {/* End message */}
      {!hasMore && blogs.length > INITIAL_COUNT && (
        <p className="text-center font-dm-sans text-muted-foreground">
          You&apos;ve reached the end. {blogs.length} stories in total.
        </p>
      )}
    </div>
  );
};
