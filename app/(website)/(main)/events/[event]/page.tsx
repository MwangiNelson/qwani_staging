import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { MinimalFooter } from "@/components/website/shared/client";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";
import { BackButton } from "@/components/website/utils";
import { fetchEventById, fetchUpcomingEvents } from "@/lib/api";
import { IEvent } from "@/utils/data_types";
import { formatSanityDate } from "@/components/website/utils/functions";
import Link from "next/link";
import { imageUrl } from "@/sanity/lib/client";
import { PortableText, type PortableTextReactComponents } from 'next-sanity'
import { myPortableTextComponents } from "@/components/website/utils/sanity_components";

const Event = async ({
  params,
}: {
  params: {
    event: string;
  };
}) => {
  const event = await fetchEventById(params.event);
  const upcommingEvents = await fetchUpcomingEvents();

  return (
    <div>
      <HeroSection event={event} />
      <PublicationsImagesSection event={event} />
      <EventDetails event={event} />
      <MinimalFooter />
      <OtherEvents
      events={upcommingEvents}
      />
    </div>
  );
};
const HeroSection = ({ event }: { event: IEvent }) => {
  return (
    <div className="bg-foreground web-px h-screen text-background pt-36 md:pt-44">
      <div className="fx-a-center gap-5 ">
        <div
          className="h-[100px] w-[10px] hidden md:flex"
          style={{
            background: `linear-gradient(180deg, #FA0000 0%, #407B73 100%)`,
          }}
        />
        <div className="fx-col gap-1">
          <div>
            <BackButton text="Back Button" />
          </div>
          <h4 className="ts7  font-bold text-primary">
            {formatSanityDate(event.date)} ,{event.time}
          </h4>
          <h3 className="ts3 font-semibold">{event.title}</h3>

          <p className="">{event.excerpt}</p>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-background text-foreground h-[35px]">
              {event.price}
            </Badge>
            {event.paymentLink && (
              <Button
                variant={"noEffect"}
                size="sm"
                className="border border-primary text-primary rounded-full"
              >
                <Link href={event.paymentLink}>Buy Ticket</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const PublicationsImagesSection = ({ event }: { event: IEvent }) => {
  return (
    <div className="-mt-[30vh]  web-px">
      <Image
        alt="CONTACT IMAGE"
        src={imageUrl(event.featuredImage)}
        width={1920}
        height={1080}
        className="h-[50vh] md:h-[60vh] object-cover"
      />
    </div>
  );
};
const EventDetails = ({ event }: { event: IEvent }) => {
  return (
    <div className="web-px mt-5">
      <div className="fx-jb fx-col-mb">
        <div className="fx-col">
          <h3 className="ts5 font-semibold">Location</h3>
          <p>{event.location}</p>
          <div>
            <BackButton />
          </div>
        </div>
        <div className="fx-a-center gap-2 py-2">
          <span>Share</span>
          <Button variant={"outline"} size={"icon"}>
            <FaXTwitter />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <FaInstagram />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <CiShare2 />
          </Button>
        </div>
      </div>
      <div className="ts5 font-semibold">Description</div>
        <div className={`prose  lg:prose-xl  `}>
      <PortableText value={
      event.description
      } components={myPortableTextComponents} />
    </div>
    </div>
  );
};

const OtherEvents = ({events}:{
  events:IEvent []
}) => {

  return (
    <div className="bg-[#F2F2F2] mt-10 py-10 web-px space-y-5">
      <h1 className="ts5 font-semibold ">Other Events</h1>
      <EventsCardsWrapper page="events"
      events={events}
      />
    </div>
  );
};
export default Event;
