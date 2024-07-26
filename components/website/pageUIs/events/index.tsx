import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useWebsiteContext } from "../../utils/WebsiteContext";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIntersectionInCarousel } from "@/lib/hook/useIntersection";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IEvent } from "@/utils/data_types";
import { formatSanityDate } from "../../utils/functions";

export const HeroSectionContent = ({
  upcommingevents,
}: {
  upcommingevents: IEvent[];
}) => {
  const { activeIndex, itemRefs } = useIntersectionInCarousel();
  return (
    <Carousel className="w-full md:px-12 h-full items-center justify-center fx ">
      <CarouselContent className="">
        {upcommingevents.map((event, index) => (
          <CarouselItem
            key={index}
            className="text-background "
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-index={index}
          >
            <div className="space-y-2 pt-10">
              <h1 className="h7 opacity-50 font-semibold">{event.location}</h1>
              <h1 className="ts6 text-primary font-bold">
                {formatSanityDate(event.date)} ,{event.time}
              </h1>
              <h1 className="ts3 font-bold">{event.title}</h1>
              <p>{event.excerpt}</p>
            </div>
            <div className="mt-4 ">
              <Button asChild>
                <Link href={`/events/${event._id}`}>Learn More</Link>
              </Button>
            </div>
            <div className="mt-5 fx gap-[1px]">
              {upcommingevents.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    " h-1 bg-background rounded-full mx-1",
                    activeIndex === index
                      ? "bg-primary w-8"
                      : "bg-background w-4"
                  )}
                ></div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        variant={"noEffect"}
        arrow={<FaAngleLeft />}
        className="text-background  md:left-0 text-lg"
      />
      <CarouselNext
        variant={"noEffect"}
        className="text-background   md:right-0 text-lg"
        arrow={<FaAngleRight />}
      />
    </Carousel>
  );
};
