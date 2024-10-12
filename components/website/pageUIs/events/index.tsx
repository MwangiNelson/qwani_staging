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
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIntersectionInCarousel } from "@/lib/hook/useIntersection";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IEvent } from "@/utils/data_types";
import { formatSanityDate } from "../../utils/functions";
import { Separator } from "@/components/ui/separator";
import { EventsCardsWrapper } from "../../shared/Wrappers";

export const HeroSectionContent = ({ events }: { events: IEvent[] }) => {
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    const upcomming = events.filter(
      (event) => new Date(event.date) > new Date()
    );

    const previus = events
      .filter((event) => new Date(event.date) < new Date())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    //set all events, if upcomming events are there, set all events to upcomming, otherwise set all events to previous
    if (upcomming.length > 0) {
      setAllEvents(
        upcomming.sort((a, b) => {
          //sort by date, latest first
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
      );
    } else {
      setAllEvents(previus);
    }
  }, [events]);
  return (
    <Carousel className="w-full md:pt-20  md:px-12 h-full items-center jushtify-center fx ">
      <CarouselContent className="">
        {allEvents.map((event, index) => (
          <Event
            key={index}
            event={event}
            // activeIndex={activeIndex}
            // itemRefs={itemRefs}
            index={index}
            events={allEvents}
          />
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
const Event = ({
  event,
  // activeIndex,
  // itemRefs,
  index,
  events,
}: {
  event: IEvent;
  // activeIndex: number;
  // itemRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
  events: IEvent[];
}) => {
  const { activeIndex, itemRefs } = useIntersectionInCarousel();
  return (
    <CarouselItem
      className="text-background "
      ref={(el) => {
        itemRefs.current[index] = el;
      }}
      data-index={index}
    >
      <div className="space-y-2">
        <h1 className="h7 opacity-50 font-semibold">{event.location}</h1>
        <h1 className="ts6 text-primary font-bold">
          {formatSanityDate(event.date)} ,{event.time}
        </h1>
        <h1 className="ts3 font-bold">{event.title}</h1>
        <p>{event.excerpt}</p>
      </div>
      <div className="mt-4 ">
        <Button asChild>
          <Link href={`/events/${event.slug.current}`}>Learn More</Link>
        </Button>
      </div>
      <div className="mt-5 fx gap-[1px]">
        {events.map((_, index) => (
          <div
            key={index}
            className={cn(
              " h-1 bg-background rounded-full mx-1",
              activeIndex === index ? "bg-primary w-8" : "bg-background w-4"
            )}
          ></div>
        ))}
      </div>
    </CarouselItem>
  );
};

export const UpcommingEvents = ({
  upcommingevents,
}: {
  upcommingevents: IEvent[];
}) => {
  const [events, setEvents] = useState<IEvent[]>(upcommingevents);
  useEffect(() => {
    const events = upcommingevents.filter(
      (event) => new Date(event.date) >= new Date()
    );
    setEvents(
      events.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
  }, [upcommingevents]);
  return (
    <div className="mt-10 web-px " id="upcoming">
      <div className="space-y-5">
        <div className="fx-a-center gap-5 ">
          <Separator className="w-10 bg-foreground" />
          Upcoming Events
        </div>
        <EventsCardsWrapper page="events" events={events} />
      </div>
    </div>
  );
};

export const PreviousEvents = ({
  events: prev_events,
}: {
  events: IEvent[];
}) => {
  const [events, setEvents] = useState<IEvent[]>(prev_events);
  useEffect(() => {
    const events = prev_events.filter(
      (event) => new Date(event.date) < new Date()
    );
    setEvents(events);
  }, [prev_events]);
  return (
    <div className="mt-10 web-px " id="past">
      <div className="space-y-5">
        <div className="fx-a-center gap-5 ">
          <Separator className="w-10 bg-foreground" />
          Previous Events
        </div>
        <EventsCardsWrapper page="events" events={events} />
      </div>
    </div>
  );
};
