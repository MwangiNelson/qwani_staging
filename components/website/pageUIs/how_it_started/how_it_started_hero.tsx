"use client";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useIntersectionInCarousel } from "@/lib/hook/useIntersection";
import { cn } from "@/lib/utils";
import { IHowItStarted, ISanityAsset } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import Portable_Text_Editor from "../../shared/portable_text_editor";

type Props = {
  content: IHowItStarted;
};

export const How_It_Started_Hero = (props: Props) => {
  return (
    <div
      className="bg-foreground min-h-screen
     flex flex-col items-center pt-36"
    >
      <div className="max-w-md flex flex-col items-center gap-1">
        <h1 className="text-2xl text-background font-bold">
          {props.content.title}
        </h1>
        <span className="italic text-background font-thin">
          {props.content.description}
        </span>
      </div>
    </div>
  );
};
export const HowItStartedImage = (props: Props) => {
  const tabs = props.content.hero_images;
  return (
    <div className="-mt-[360px] p-4 team-member-px ">
      <Carousel className="text-background">
        <CarouselContent>
          {tabs.map((item, index) => {
            return (
              <HeroEvent key={index} tab={item} tabs={tabs} index={index} />
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
const HeroEvent = ({
  tab,
  index: _index,
  tabs,
}: {
  tab: ISanityAsset;
  index: number;
  tabs: ISanityAsset[];
}) => {
  const { activeIndex, itemRefs } = useIntersectionInCarousel();
  const [activeI, setActiveI] = React.useState(0);
  const x = useCarousel();
  useEffect(() => {
    setActiveI(activeIndex);
  }, [x]);

  return (
    <CarouselItem
      className="relative"
      ref={(el) => {
        itemRefs.current[_index] = el;
      }}
      data-index={_index}
    >
      <div className="flex gap-1 absolute left-0 z-[0] w-full">
        {tabs.map((item, index) => (
          <div
            className={cn(
              "w-full h-[5px] ",
              activeI === index ? "bg-background" : "bg-background/40"
            )}
            key={index}
          />
        ))}
      </div>
      <Image
        src={imageUrl(tab)}
        alt="hero"
        width={2000}
        height={2000}
        objectFit="cover"
        className="w-full object-cover h-[80vh]"
      />
    </CarouselItem>
  );
};

export const HowItStartedMain = (props: Props) => {
  return (
    <div>
      <div className="team-member-px py-5 space-y-5 w-full">
        <Portable_Text_Editor classNames="w-full" body={props.content.body} />
      </div>
    </div>
  );
};
