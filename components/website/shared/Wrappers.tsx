import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventCard } from "./Cards";

export const EventsCardsWrapper = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="gap-1 md:gap-5 h-auto">
        {[1, 2, 3, 4, 6].map((item, index) => {
          return (
            <CarouselItem key={index} className=" basis-[80%] md:basis-1/4">
              <EventCard index={index} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
