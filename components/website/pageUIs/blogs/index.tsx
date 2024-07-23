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
import { Badge } from "@/components/ui/badge";
import { blog_categories } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function TrendingBlogsWrapper() {
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" basis-[85%] md:basis-1/3 ">
            <BlogCardPrimary />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
export const BlogCategoriesFilter = () => {
  return (
    <div className="bg-background py-5 web-px">
      <div className="fx-center">
        <div className="max-w-screen-sm flex flex-wrap fx-center ">
          {blog_categories.map((category, index) => (
            <Badge key={index} className="mr-2 mb-2" variant={"outline"}>
              {category}
            </Badge>
          ))}
        </div>
      </div>
      <div className="w-full fx-center mt-5">
        <div className="fx-col items-center">
          <h1 className="ts7 font-semibold ">Technology</h1>
          <Separator className="bg-secondary  w-[70px] h-[2px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5 mt-5 ">
        {Array.from({ length: 4 }).map((_, index) => (
          <BlogCardMain key={index} bg="background" />
        ))}
      </div>
    </div>
  );
};

export const AllBlogsCards = () => {
  return (
    <div className="fx-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mt-5 ">
        {Array.from({ length: 8 }).map((_, index) => (
          <BlogCardPrimary key={index} size="small" />
        ))}
      </div>
      <div className="fx-center">
        <Button size={"sm"}>Read More</Button>
      </div>
    </div>
  );
};
