import { Button } from "@/components/ui/button";
import {
  AboutPageDetailsCard,
  AboutPageValueCard,
} from "@/components/website/pageUIs";
import { HeroUI } from "@/components/website/shared/CommonUi";
import { TeamMemberWrapper } from "@/components/website/shared/Wrappers";
import {
  formatSanityText,
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchAboutPageContent } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IAboutPage } from "@/utils/data_types";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { FaArrowDown } from "react-icons/fa";
async function AboutPage() {
  const about = await fetchAboutPageContent();

  return (
    <div>
      <HeroSection about={about} />
      <AboutQwaniSection about={about} />
      <DetailsCards about={about} />
      <OurValuesSection about={about} />
      <OurTeamSection about={about} />
    </div>
  );
}
const HeroSection = ({ about }: { about: IAboutPage }) => {
  return (
    <HeroUI imageLink={imageUrl(about.heroImage)}>
      <div className="  md:mt-28  text-background fx-col gap-5 justify-start ">
        <h1 className="mb:text-center text-5xl md:text-6xl lg:text-[90px] font-bold  leading-tight ">
          {formatSanityText(about.heroTitle, "text-primary")}
        </h1>
      </div>
    </HeroUI>
  );
};
const CustomTitle: React.FC<{ title: string; titleNumber: number }> = ({
  title,
  titleNumber,
}) => {
  return (
    <div className="fx-a-center gap-5 py-3 font-bold">
      <Button variant={"outline"} className="rounded-full border-foreground/50">
        {titleNumber}
      </Button>
      <h1 className="h2">{title}</h1>
    </div>
  );
};
const AboutQwaniSection = ({ about }: { about: IAboutPage }) => {
  return (
    <div className="web-px pt-20 space-y-5">
      <CustomTitle title={about.aboutTitle} titleNumber={1} />
      <div className="md:ml-20">
        <p className="text-lg">{about.aboutDescription}</p>
      </div>
    </div>
  );
};
const OurValuesSection = ({ about }: { about: IAboutPage }) => {
  return (
    <div className="web-px mt-10">
      <CustomTitle title={about.valuesTitle} titleNumber={2} />
      <div className="w-full fx md:justify-end">
        <p className="md:max-w-[300px]">{about.valuesDescription}</p>
      </div>
      <div className="fx-col-mb gap-10 md:gap-5 w-full fx-jb mt-5 ">
        {about.values.map((value, index) => (
          <AboutPageValueCard
            key={index}
            title={value.title}
            description={value.description}
            index={index * 10}
          />
        ))}
      </div>
    </div>
  );
};
const DetailsCards = ({ about }: { about: IAboutPage }) => {
  return (
    <div className="web-px w-full mt-20">
      <div className="fx-col-mb gap-10 md:gap-5 w-full fx-jb ">
        {about.statistics.map((stat, index) => (
          <AboutPageDetailsCard
            key={index}
            title={stat.number}
            description={stat.label}
            index={index * 10}
          />
        ))}
      </div>
      <div className="gap-2 text-[#D9D9D9] py-20 relative h-[60vh] md:h-[70vh] fx-center fx-col ">
        <Image
          className="absolute z-[-1] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          src={imageUrl(about.exploreMoreImage)}
          alt="Nice Image"
          height={500}
          width={500}
        />
        <h1 className="h1 -ml-20 md:-ml-72">Explore More</h1>
        <div className="fx-a-center  -mr:10 md:ml-72 gap-2">
          <Button
            className="rounded-full bg-background/10 hover:bg-background/20 hover:text-background"
            variant={"outline"}
            size={"icon"}
          >
            <FaArrowDown />
          </Button>
          <h1 className="h1">About Qwani</h1>
        </div>
      </div>
    </div>
  );
};
const OurTeamSection = ({ about }: { about: IAboutPage }) => {
  return (
    <div className="web-px mt-20" id="team">
      <CustomTitle title={about.teamTitle} titleNumber={3} />
      <div className="mt-5 mb-10">
        <TeamMemberWrapper teamMembers={about.teamMembers} />
      </div>
    </div>
  );
};
export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("about");
  return results;
}
export default AboutPage;
