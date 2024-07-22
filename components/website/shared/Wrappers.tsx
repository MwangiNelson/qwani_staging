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
  PublicationCards,
  TeamMemberCard,
  WriterCard,
} from "./Cards";

export const EventsCardsWrapper = ({
  page = "home",
}: {
  page?: "home" | "events";
}) => {
  if (page === "home") {
    return (
      <Carousel className="w-full">
        <CarouselContent className="gap-1 md:gap-5 h-auto">
          {[1, 2, 3, 4, 6].map((item, index) => {
            return (
              <CarouselItem
                key={index}
                className=" basis-[85%] md:basis-1/3 lg:basis-1/4"
              >
                <EventCard index={index} />
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
      {Array.from({ length: 4 }).map((_, index) => {
        return <EventCardMain key={index} index={index} />;
      })}
    </div>
  );
};

export const TeamMemberWrapper = () => {
  return (
    <div className="grid  gap-5  md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
      {Array.from({ length: 4 }).map((_, index) => {
        return <TeamMemberCard key={index} />;
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
