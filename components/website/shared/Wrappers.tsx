import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  EventCard,
  EventCardMain,
  TeamMemberCard,
  WriterCard,
} from "./cards/common";
import { IEvent, ITeamMember } from "@/utils/data_types";

export const EventsCardsWrapper = ({
  events = [],
  page = "home",
}: {
  page?: "home" | "events";
  events: IEvent[];
}) => {
  if (page === "home") {
    return (
      <Carousel className="w-full">
        <CarouselContent className="gap-1 md:gap-5 h-auto">
          {events.map((item, index) => {
            return (
              <CarouselItem
                key={index}
                className=" basis-[85%] md:basis-1/3 lg:basis-1/4"
              >
                <EventCard event={item} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }
  return (
    <div className="grid  gap-5  md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {events.map((event, index) => {
        return <EventCardMain key={index} event={event} />;
      })}
    </div>
  );
};

export const TeamMemberWrapper = ({
  teamMembers,
}: {
  teamMembers: ITeamMember[];
}) => {
  return (
    <div className="grid  gap-5  md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
      {teamMembers.map((item, index) => {
        return <TeamMemberCard key={index} member={item} />;
      })}
    </div>
  );
};
export const WritersWrapper = () => {
  return (
    <div className="grid  gap-5  md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
      {Array.from({ length: 10 }).map((_, index) => {
        return <WriterCard key={index} />;
      })}
    </div>
  );
};
