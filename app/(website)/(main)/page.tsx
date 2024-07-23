import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/website/shared/cards/common";
import { HeroUI } from "@/components/website/shared/CommonUi";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <main className="">
      <HeroUI imageLink="/home.png">
        <div className="text-background  fx-col gap-5 justify-start md:mt-28 ">
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
      <Psection />
      <BlogsSections />
    </main>
  );
};

const AboutSection = () => {
  return (
    <div className="fx-col  gap-8 web-px mt-14">
      <div className="fx-col-mb gap-1 md:gap-10">
        <h3 className="h5 text-primary ">About Qwani</h3>
        <p className="text-lg w-full flex-1  font-medium  ">
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
        "flex flex-col gap-10  md:flex-row ",
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
    <div className="web-px fx-col gap-5 mt-14 ">
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
    <div className="web-px bg-[rgba(0,0,0,.98)] py-10 md:py-20 fx-col gap-5 mt-14 md:gap-10 relative">
      <Image
        src="/home.png"
        alt="Home"
        width={1000}
        height={1000}
        className="w-full absolute o top-0 left-0 z-[-1] object-cover h-full rounded-lg"
      />
      <div className="flex flex-col md:flex-row  items-start gap-1 md:gap-10 md:items-end">
        <h1 className="mb:font-bold text-2xl text-primary text-center w-full  md:text-start">
          Upcoming Events
        </h1>

        <p className="text-background text-center md:text-start flex-1 text-lg md:text-xl font-medium md:font-semibold">
          Celebrate Creativity and Community
        </p>
      </div>
      <EventsCardsWrapper />
      <div className="fx-center mt-10 ">
        <Button size={"sm"} className=" rounded-full">
          View All Events
        </Button>
      </div>
    </div>
  );
};
const Psection = () => {
  return (
    <div className="h-[70vh] fx-center bg-accent web-px">
      <h3 className="text-2xl md:text-4xl text-center font-mont font-medium ">
        The Perfect Place to Ponder, Play, and Pen Your
        <span className="font-bold"> Passionate</span>, Peculiar, and Profound
        Prose
      </h3>
    </div>
  );
};
const BlogsSections = () => {
  return (
    <div className="fx-col gap-5 web-px py-20">
      <Separator className="bg-foreground/70" />
      <div className="fx-col-mb mb:gap-3 md:justify-between md:items-center my-1">
        <div className="fx items-center gap-1">
          <Separator className="w-14 bg-foreground" />
          <h4 className="font-medium text-xl">New & Stuff</h4>
        </div>
        <Link href={"#"}>See More</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5">
        {[
          {
            title: "The Art of Writing",
            imageUrl: "/imgs/4.jpg",
            date: "May 25th 2024",
          },
          {
            title: "The Art of Writing",
            imageUrl: "/imgs/5.jpg",
            date: "May 25th 2024",
          },
          {
            title: "The Art of Writing",
            imageUrl: "/imgs/6.jpg",
            date: "May 25th 2024",
          },
        ].map((item, index) => (
          <BlogCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
