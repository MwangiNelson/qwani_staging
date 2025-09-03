import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EventCardsHome } from "@/components/website/pageUIs/homepage";
import { JoinCommunityButton } from "@/components/website/shared/atoms";
import { BlogCard } from "@/components/website/shared/cards/common";
import { HeroUI } from "@/components/website/shared/CommonUi";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";
import {
  formatSanityText,
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchEvents, getHomePageContent } from "@/lib/api";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/sanity/lib/client";
import { IHomePage } from "@/utils/data_types";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
const Home = async () => {
  const [homepage, events] = await Promise.all([
    getHomePageContent(),
    fetchEvents(),
  ]);
  if (!homepage) return null;
  return (
    <main className="">
      <HeroUI imageLink={imageUrl(homepage.heroImage)}>
        <div className="text-background  fx-col gap-5 justify-start md:mt-28 ">
          <h1 className=" h1 text-start ">
            {formatSanityText(homepage.heroTitle, "text-primary")}
          </h1>
          <p className="text-xl text-start">{homepage.heroSubtitle}</p>
          <div className="w-full items-start">
            <JoinCommunityButton
              size="default"
              link={homepage.heroButtonLink}
              text={homepage.heroButtonText}
            />
          </div>
        </div>
      </HeroUI>
      <AboutSection homepage={homepage} />
      <AboutCards homepage={homepage} />
      <EventCardsHome homepage={homepage} events={events} />
      <Psection homepage={homepage} />
      <BlogsSections homepage={homepage} />
    </main>
  );
};

const AboutSection = ({ homepage }: { homepage: IHomePage }) => {
  return (
    <div className="fx-col  gap-8 web-px mt-14">
      <div className="fx-col-mb gap-1 md:gap-10">
        <h3 className="h5 text-primary ">{homepage.aboutTitle}</h3>
        <p className="text-lg w-full flex-1  font-medium  ">
          {homepage.aboutDescription}
        </p>
      </div>
      <div className="w-full">
        <Image
          src={imageUrl(homepage.aboutImage) || "/youth.jpg"}
          alt="Youth"
          width={1000}
          height={1000}
          className="w-full max-h-[500px]  object-cover rounded-lg cursor-pointer"
        />
      </div>
      <div className="fx-col-mb gap-1 md:gap-10">
        <h3 className="h5 text-primary ">Qwani</h3>
        <p className="text-lg font-semibold">{homepage.about2Title}</p>
        <p className="text-lg w-full flex-1">{homepage.about2description}</p>
      </div>
    </div>
  );
};
const AboutCard = (item: {
  highlight: IHomePage["highlights"][0];
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
        src={imageUrl(item.highlight.image)}
        width={500}
        alt="Image"
        height={500}
        className="rounded-lg w-full h-[300px] md:h-[400px] object-cover"
      />
      {/* </div> */}
      <div className="fx-col justify-center md:items-center gap-1 w-full">
        <h3 className="h5 text-primary ">{item.highlight.title}</h3>
        <p className="w-full ">{item.highlight.description}</p>
      </div>
    </div>
  );
};
const AboutCards = ({ homepage }: { homepage: IHomePage }) => {
  return (
    <div className="web-px fx-col gap-5 mt-14 ">
      {homepage.highlights.map((item, index) => (
        <AboutCard key={index} highlight={item} index={index} />
      ))}
    </div>
  );
};

const Psection = ({ homepage }: { homepage: IHomePage }) => {
  return (
    <div className="h-[70vh] fx-center bg-accent web-px">
      <h3 className="text-2xl md:text-4xl text-center font-mont font-medium ">
        {formatSanityText(homepage.graySectionTitle, "font-bold")}
      </h3>
    </div>
  );
};
const BlogsSections = ({ homepage }: { homepage: IHomePage }) => {
  return (
    <div className="fx-col gap-5 web-px py-20">
      <Separator className="bg-foreground/70" />
      <div className="fx-col-mb mb:gap-3 md:justify-between md:items-center my-1">
        <div className="fx items-center gap-1">
          <Separator className="w-14 bg-foreground" />
          <h4 className="font-medium text-xl">{homepage.blogsTitle}</h4>
        </div>
        <Link href={"#"}>See More</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-5">
        {homepage.blogs.map((item, index) => (
          <BlogCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
export async function generateMetadata(): Promise<Metadata> {
  const results = pageMetadata("home");
  return results;
}
export default Home;
