import Image from "next/image";
import React from "react";
import {
  HeroSectionContent,
  PreviousEvents,
  UpcommingEvents,
} from "@/components/website/pageUIs/events";
import { Separator } from "@/components/ui/separator";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";
import { fetchEvents } from "@/lib/api";
import { IEvent } from "@/utils/data_types";
import { pageMetadata } from "@/components/website/utils/functions";
import { Metadata } from "next";

const Events = async () => {
  const events = await fetchEvents();
  if (!events) return null;
  const upcommingevents = events.filter(
    (event) => new Date(event.date) > new Date()
  );

  return (
    <div className="pb-20">
      <HeroSection>
        <HeroSectionContent events={events} />
      </HeroSection>
      <UpcommingEvents upcommingevents={upcommingevents} />
      <PreviousEvents events={events} />
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

export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("events");
  return results;
}

export default Events;
