"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogCardMain, BlogCardPrimary } from "../../shared/cards/blogs";
import { IPost, IPostCategory } from "@/utils/data_types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TrendingBlogsWrapper({ blogs }: { blogs: IPost[] }) {
  return (
    <Carousel className="w-full   ">
      <CarouselContent className="gap-1 ">
        {blogs.map((item, index) => (
          <CarouselItem
            key={index}
            className=" basis-[85%] md:basis-1/3 
          h-full
          "
          >
            <BlogCardPrimary blog={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
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
  const [activeCategory, setActiveCategory] = React.useState<IPostCategory>(
    categories[0]
  );
  const activeBlogs = blogs.filter((blog) =>
    blog.categories.find((category) => category._id === activeCategory._id)
  );
  return (
    <div className="bg-background py-5 web-px">
      <div className="fx-center">
        <div className="max-w-screen-sm flex flex-wrap fx-center ">
          {categories.map((category, index) => (
            <Badge
              key={index}
              className={cn(
                "mr-2 mb-2 cursor-pointer",
                activeCategory._id === category._id
                  ? "bg-primary text-background "
                  : "bg-transparent text-foreground border-border hover:text-background"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category.title}
            </Badge>
          ))}
        </div>
      </div>
      <div className="w-full fx-center mt-5">
        <div className="fx-col items-center">
          <h1 className="ts7 font-semibold ">{activeCategory.title}</h1>
          <Separator className="bg-secondary  w-[70px] h-[2px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5 mt-5 ">
        {activeBlogs.length > 0 ? (
          activeBlogs.map((blog, index) => (
            <BlogCardMain bg="background" key={index} blog={blog} />
          ))
        ) : (
          <div className="fx-center w-full col-span-4">
            <p className="text-center text-md">No blogs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AllBlogsCards = ({ blogs }: { blogs: IPost[] }) => {
  const [visibleBlogs, setVisibleBlogs] = React.useState<IPost[]>(
    blogs.slice(0, 20)
  );
  const [moreBlogs, setMoreBlogs] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (visibleBlogs.length >= blogs.length) {
      setMoreBlogs(false);
    }
  }, [blogs, visibleBlogs]);
  return (
    <div className="fx-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mt-5 ">
        {visibleBlogs.map((blog, index) => (
          <BlogCardPrimary key={index} size="small" blog={blog} />
        ))}
      </div>
      <div className="fx-center">
        {moreBlogs && (
          <Button
            size={"sm"}
            onClick={() => {
              setVisibleBlogs((prev) => [
                ...prev,
                ...blogs.slice(prev.length, prev.length + 20),
              ]);
            }}
          >
            Read More
          </Button>
        )}
      </div>
    </div>
  );
};
