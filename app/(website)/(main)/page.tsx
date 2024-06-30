import { Button } from "@/components/ui/button";
import {
  CustomVideoPlayer,
  HeroUI,
} from "@/components/website/shared/CommonUi";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function Home() {
  return (
    <main className=" fx-col gap-5">
      <HeroUI imageLink="/home.png">
        <div className=" mb:-mt-14  text-background fx-col gap-5 justify-start ">
          <h1 className=" h1 text-center ">
            Discover
            <span className="text-primary"> Qwani</span>: A Hub for Young
            Writers and Exciting <span className="text-primary">Events</span>
          </h1>
          <p className="text-xl text-center">
            Qwani champions the artistry of young writers, curating a rich
            tapestry of narratives that resonate with the soul and spark
            imagination.
          </p>
          <div className="w-full place-content-center fx">
            <Button>Join Community</Button>
          </div>
        </div>
      </HeroUI>
      <AboutSection />
      <AboutCards />
      <EventCards />
    </main>
  );
}
const AboutSection = () => {
  return (
    <div className="fx-col  gap-8 web-px mt-10">
      <div className="fx-col-mb gap-1 md:gap-10">
        <h3 className="h5 text-primary ">About Qwani</h3>
        <p className="text-lg w-full flex-1   ">
          Qwani is a vibrant youth-led initiative, serving as a dynamic platform
          for emerging writers. It celebrates diversity in literature,
          showcasing fresh perspectives across various forms of writing, from
          gripping short stories to evocative poetry.
        </p>
      </div>
      <div className="w-full">
        <Image
          src={"/youth.jpg"}
          alt="Youth"
          width={1000}
          height={1000}
          className="w-full max-h-[500px]  object-cover rounded-lg cursor-pointer"
        />
      </div>
      <div className="fx-col-mb gap-1 md:gap-10">
        <h3 className="h5 text-primary ">Qwani</h3>
        <p className="text-lg font-semibold">Literary Voices Unleashed</p>
        <p className="text-lg w-full flex-1">
          Qwani is a vibrant youth-led initiative, serving as a dynamic platform
          for emerging writers. It celebrates diversity in literature,
          showcasing fresh perspectives across various forms of writing, from
          gripping short stories to evocative poetry.
        </p>
      </div>
    </div>
  );
};
const AboutCard = (item: {
  image: string;
  title: string;
  paragraph?: string;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-10  md:flex-row",
        item.index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* <div className="w-full h-full h-"> */}
      <Image
        src={item.image}
        width={500}
        alt="Image"
        height={500}
        className="rounded-lg w-full h-[300px] md:h-[400px] object-cover"
      />
      {/* </div> */}
      <div className="fx-col justify-center md:items-center gap-1 w-full">
        <h3 className="h5 text-primary ">{item.title}</h3>
        <p className="w-full ">{item.paragraph}</p>
      </div>
    </div>
  );
};
const AboutCards = () => {
  return (
    <div className="web-px fx-col gap-5 ">
      {[
        {
          image: "/literature.png",
          title: "Diverse Literary Works",
          paragraph:
            "Qwani publishes an array of literary pieces, from thought-provoking essays to vibrant poetry, reflecting a spectrum of voices.",
        },
        {
          image: "/events.png",
          title: "VIBRANT LITERATURE AND FUN EVENTS",
          paragraph:
            "Qwani hosts engaging events, including book launches and writers’ forums, to celebrate and inspire the literary community",
        },
        {
          title: "Supporting Aspiring Writers",
          image: "/fun.png",
          paragraph:
            "Qwani is dedicated to discovering and nurturing new writing talent, providing a platform for their work to shine.",
        },
      ].map((item, index) => (
        <AboutCard
          key={index}
          {...{
            ...item,
            index,
          }}
        />
      ))}
    </div>
  );
};
const EventCards = () => {
  return (
    <div className="web-px bg-[rgba(0,0,0,.98)] py-14 fx-col gap-5  md:gap-10 relative">
      <Image
        src="/home.png"
        alt="Home"
        width={1000}
        height={1000}
        className="w-full absolute o top-0 left-0 z-[-1] object-cover h-full rounded-lg"
      />
      <div className="flex flex-col md:flex-row  items-start gap-1 md:gap-10">
        <h1 className="mb:font-bold md:text-2xl text-primary">
          Upcoming Events
        </h1>
        <div className="flex-1">
          <p className="text-background text-lg md:text-xl font-medium md:font-semibold">
            Celebrate Creativity and Community
          </p>
        </div>
      </div>
      <EventsCardsWrapper />
      <div className="fx-center ">
        <Button size={"sm"} className=" rounded-full">
          View All Events
        </Button>
      </div>
    </div>
  );
};
