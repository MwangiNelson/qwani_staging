import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {  FaInstagram, FaXTwitter } from "react-icons/fa6";
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
import { Sharing } from "@/components/website/shared/sharing";
import { Metadata, ResolvingMetadata } from "next";
import { Props } from "@/utils/uitypes";
import Portable_Text_Editor from "@/components/website/shared/portable_text_editor";

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
    <div className="bg-foreground web-px min-h-[90vh] md:h-screen text-background pt-36 md:pt-44">
      <div className="fx-a-center gap-5 ">
        <div
          className="h-[100px] w-[10px] hidden md:flex"
          style={{
            background: `linear-gradient(180deg, #FA0000 0%, #407B73 100%)`,
          }}
        />
        <div className="fx-col gap-1">
          <div>
            <BackButton text="Go Back" />
          </div>
          <h4 className="ts7  font-bold text-primary">
            {formatSanityDate(event.date)} ,{event.time}
          </h4>
          <h3 className="ts3 font-semibold">{event.title}</h3>

          <p className="">{event.excerpt}</p>
          <div className="flex gap-2 mt-2">
             <Button
                variant={"noEffect"}
                size="sm"
                className="border border-primary text-primary rounded-full"
              >
               For Only {
                  event.price
                } Ksh
              </Button>
            
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
        </div>
        <div className="fx-a-center gap-2 py-2">
         <Sharing/>
        </div>
      </div>
      <div className="ts5 mt-5 font-semibold">Description</div>
        <div className={`prose  lg:prose-xl  `}>
      {/* <PortableText value={
      event.description
      } components={myPortableTextComponents} /> */}
      <Portable_Text_Editor body={event.description} />

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
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
   const data=await fetchEventById(params.event as string) 
  return {
    title: data.title,
    description: data.excerpt,
    keywords: "Qwani, young writers, events, writing, literature",
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: [
        {
          url: imageUrl(data.featuredImage),
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  }; 



}

export default Event;
