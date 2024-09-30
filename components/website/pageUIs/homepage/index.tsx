"use client";
import { IEvent, IHomePage } from "@/utils/data_types";
import Image from "next/image";
import { EventsCardsWrapper } from "../../shared/Wrappers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export const EventCardsHome = ({ homepage }: { homepage: IHomePage }) => {
  const [events, setEvents] = useState<IEvent[]>(homepage.events);

  useEffect(() => {
    const eventsFiltered = homepage.events.filter((event) => {
      return new Date(event.date) > new Date();
    });
    setEvents(eventsFiltered);
  }, [homepage]);

  return (
    <div className="web-px bg-[rgba(0,0,0,.98)] py-10 md:py-20 fx-col gap-5 mt-14 md:gap-10 relative">
      <Image
        src="/home.png"
        alt="Home"
        width={1000}
        height={1000}
        className="w-full absolute o top-0 left-0 z-[-1] object-cover h-full rounded-lg"
      />
      <div className="w-full">
        <h1 className="mb:font-bold text-2xl text-primary w-full text-start">
          {homepage.eventsTitle}
        </h1>

        <p className="text-background w-full text-start flex-1 text-lg md:text-xl font-medium md:font-semibold">
          {homepage.eventsDescription}
        </p>
      </div>
      {events.length > 0 && <EventsCardsWrapper events={events} />}
      {!events.length && (
        <div className="fx-center min-h-[200px]">
          <p className="text-center text-lg font-medium text-background">
            No upcoming events
          </p>
        </div>
      )}
      <div className="fx-center mt-5 ">
        <Button size={"sm"} className=" rounded-full" asChild>
          <Link href={"/events"}>View All Events</Link>
        </Button>
      </div>
    </div>
  );
};
