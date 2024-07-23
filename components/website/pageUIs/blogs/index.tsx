import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogCardPrimary } from "../../shared/cards/blogs";
import { Badge } from "@/components/ui/badge";
import { blog_categories } from "@/lib/data";

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
    <div className="bg-background py-10 web-px">
      <div className="fx-center">
        <div className="max-w-screen-sm flex flex-wrap fx-center ">
          {blog_categories.map((category, index) => (
            <Badge key={index} className="mr-2 mb-2" variant={"outline"}>
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
