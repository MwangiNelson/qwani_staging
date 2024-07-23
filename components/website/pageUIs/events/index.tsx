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
} from "@/components/ui/carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useWebsiteContext } from "../../utils/WebsiteContext";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIntersectionInCarousel } from "@/lib/hook/useIntersection";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const HeroSectionContent = () => {
  const { activeIndex, itemRefs } = useIntersectionInCarousel();
  return (
    <Carousel className="w-full md:px-12 h-full items-center justify-center fx ">
      <CarouselContent className="">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="text-background "
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-index={index}
          >
            <div className="space-y-2">
              <h1 className="h7 opacity-50 font-semibold">
                Kenya Railways Museum
              </h1>
              <h1 className="ts6 text-primary font-bold">
                May 25th 2024, 8:00am
              </h1>
              <h1 className="ts3 font-bold">Qwani X Uzima Sketch Tour</h1>
              <p>
                This time, our tour will be at the Kenya Railways Museum as a
                continuation of our previous tour around the area. We will learn
                the History of the Uganda Railway/Lunat
              </p>
            </div>
            <div className="mt-4 ">
              <Button asChild>
                <Link href={`/events/1234`}>Learn More</Link>
              </Button>
            </div>
            <div className="mt-5 fx gap-[1px]">
              {Array.from({ length: 5 }).map((_, index) => (
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
