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
import { usePathname, useSearchParams } from "next/navigation";
import { useIntersectionInCarousel } from "@/lib/hook/useIntersection";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IEvent, ILocation } from "@/utils/data_types";
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

type EventsDisplayProps = {
  events: IEvent[];
  location?: ILocation;
  type: "upcoming" | "previous";
  locations: ILocation[];
};

export const EventsDisplay = ({
  events: initialEvents,
  location,
  type,
}: EventsDisplayProps) => {
  const [events, setEvents] = useState<IEvent[]>(initialEvents);

  useEffect(() => {
    const dateFiltered = initialEvents.filter((event) =>
      type === "upcoming"
        ? new Date(event.date) >= new Date()
        : new Date(event.date) < new Date()
    );

    const sortedEvents =
      type === "upcoming"
        ? dateFiltered.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
        : dateFiltered;

    const locationFiltered = sortedEvents.filter((event) => {
      if (!location) return true;
      if (!event.county && location.slug.current === "nairobi") {
        return true;
      }
      if (event.county) {
        return event?.county?.slug?.current === location?.slug?.current;
      }

      return false;
    });

    setEvents(locationFiltered);
  }, [initialEvents, location, type]);
  return (
    <div className="mt-10 web-px" id={type}>
      <div className="space-y-5">
        <div className="fx-a-center gap-5">
          <Separator className="w-10 bg-foreground" />
          {type === "upcoming" ? "Upcoming Events" : "Previous Events"}
        </div>
        {events.length > 0 ? (
          <EventsCardsWrapper page="events" events={events} />
        ) : (
          <NoEventsIllustration type={type} location={location} />
        )}
      </div>
    </div>
  );
};

const NoEventsIllustration = ({
  type,
  location,
}: {
  type: "upcoming" | "previous";
  location?: ILocation;
}) => (
  <div className="flex flex-col items-center justify-center py-10 space-y-6">
    <svg
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-muted-foreground opacity-50"
    >
      <path
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="15"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13V15L13 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <h1 className="text-lg text-muted-foreground">
      {location
        ? `No ${type} events in ${location?.title} at the moment`
        : `No ${type} events at the moment`}
    </h1>
  </div>
);
export const EventsDisplayContainer = ({
  locations,
  events,
}: {
  locations: ILocation[];
  events: IEvent[];
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("location");
  const location = locations.find(
    (location) => location.slug.current === search
  );

  return (
    <div className="">
      <div className="mt-10 web-px space-y-4" id="location-events">
        <h1 className="text-lg font-semibold">
          {location?.title || "All   Events"} Events
        </h1>
        <Separator />
      </div>
      <EventsDisplay
        events={events}
        location={location}
        type="upcoming"
        locations={locations}
      />
      <EventsDisplay
        events={events}
        location={location}
        type="previous"
        locations={locations}
      />
    </div>
  );
};
