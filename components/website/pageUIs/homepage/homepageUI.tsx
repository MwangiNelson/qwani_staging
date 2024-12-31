"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
  useCarousel,
} from "@/components/ui/carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useWebsiteContext } from "../../utils/WebsiteContext";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIntersectionInCarousel } from "@/lib/hook/useIntersection";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IEvent, IPost } from "@/utils/data_types";
import { formatSanityDate } from "../../utils/functions";
import { Separator } from "@/components/ui/separator";
import { EventsCardsWrapper } from "../../shared/Wrappers";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/client";

type Props = {
  blogs: IPost[];
};

export const HomepageUI = ({ blogs }: Props) => {
  const [allBlogs, setAllBlogs] = useState<IPost[]>(blogs);

  return (
    <Carousel className="w-full h-full ">
      <CarouselContent className="">
        {allBlogs.map((blog, index) => (
          <Blog key={index} blog={blog} index={index} />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const Blog = ({ blog, index }: { blog: IPost; index: number }) => {
  const {
    api,
    canScrollNext,
    canScrollPrev,
    scrollNext,
    scrollPrev,
  } = useCarousel();
  const { activeIndex, itemRefs } = useIntersectionInCarousel();
  return (
    <CarouselItem
      ref={(el) => {
        itemRefs.current[index] = el;
      }}
      data-index={index}
      style={{
        backgroundImage: `
      linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.40) 100%),
      url(${imageUrl(blog.mainImage)})
    `,
        aspectRatio: "16/9",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative h-screen  text-white w-full "
    >
      <div className="web-px  pt-48 pb-20 z-[10] w-full h-full">
        <div className="flex flex-col md:p-4 gap-2 justify-between h-full">
          <div className="flex flex-col gap-2 flex-1 h-full">
            <h1 className="z-[3] text-5xl  font-bold">{blog.title}</h1>
            <p>{blog.excerpt}</p>
          </div>
          <div className="flex justify-between ">
            <Button className="bg-background hover:bg-background/90 text-foreground rounded-full">
              Read More
            </Button>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};
