"use client";
import Image from "next/image";
import React from "react";
import { HeroSectionContent } from "@/components/website/pageUIs/events";
import { Separator } from "@/components/ui/separator";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";

const Events = () => {
  return (
    <div className="pb-20">
      <HeroSection>
        <HeroSectionContent />
      </HeroSection>
      <UpcommingEvents />
    </div>
  );
};
const HeroSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        background: ` linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, 
        rgba(0, 0, 0, 0.01) 21%, rgba(0, 0, 0, 0.00) 100%),
         linear-gradient(90deg, #000 0.07%, rgba(0, 0, 0, 0.00) 99.93%)`,
      }}
      className=" web-px h-[100vh] bg-primary fx items-center relative"
    >
      <Image
        src={`/event.jpg`}
        alt="hero"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      />
      {children}
    </div>
  );
};

const UpcommingEvents = () => {
  return (
    <div className="mt-10 web-px ">
      <div className="space-y-5">
        <div className="fx-a-center gap-5 ">
          <Separator className="w-20 bg-foreground" />
          Upcomming Events
        </div>
        <EventsCardsWrapper page="events" />
      </div>
      <div className="space-y-5 mt-10">
        <div className="fx-a-center gap-5 ">
          <Separator className="w-20 bg-foreground" />
          Prevoius Events
        </div>
        <EventsCardsWrapper page="events" />
      </div>
    </div>
  );
};
export default Events;
