import Image from "next/image";
import React from "react";
import { HeroSectionContent } from "@/components/website/pageUIs/events";
import { Separator } from "@/components/ui/separator";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";
import { fetchEvents } from "@/lib/api";
import { IEvent } from "@/utils/data_types";

const Events = async () => {
  const events = await fetchEvents();
  if (!events) return null;
  const upcommingevents = events.filter(
    (event) => new Date(event.date) > new Date()
  );
  const previousevents = events.filter(
    (event) => new Date(event.date) < new Date()
  );

  return (
    <div className="pb-20">
      <HeroSection>
        <HeroSectionContent upcommingevents={upcommingevents} />
      </HeroSection>
      <UpcommingEvents upcommingevents={upcommingevents} />
      <PreviousEvents events={previousevents} />
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

const UpcommingEvents = ({
  upcommingevents,
}: {
  upcommingevents: IEvent[];
}) => {
  return (
    <div className="mt-10 web-px ">
      <div className="space-y-5">
        <div className="fx-a-center gap-5 ">
          <Separator className="w-20 bg-foreground" />
          Upcomming Events
        </div>
        <EventsCardsWrapper page="events" events={upcommingevents} />
      </div>
    </div>
  );
};

const PreviousEvents = ({ events }: { events: IEvent[] }) => {
  return (
    <div className="mt-10 web-px ">
      <div className="space-y-5">
        <div className="fx-a-center gap-5 ">
          <Separator className="w-20 bg-foreground" />
          Previous Events
        </div>
        <EventsCardsWrapper page="events" events={events} />
      </div>
    </div>
  );
};

export default Events;
