import { Button } from "@/components/ui/button";
import {
  AboutPageDetailsCard,
  AboutPageValueCard,
} from "@/components/website/pageUIs";
import { TeamMemberCard } from "@/components/website/shared/Cards";
import { HeroUI } from "@/components/website/shared/CommonUi";
import { TeamMemberWrapper } from "@/components/website/shared/Wrappers";
import Image from "next/image";
import React from "react";
import { FaArrowDown } from "react-icons/fa";
function AboutPage() {
  return (
    <div>
      <HeroSection />
      <AboutQwaniSection />
      <DetailsCards />
      <OurValuesSection />
      <OurTeamSection />
    </div>
  );
}
const HeroSection = () => {
  return (
    <HeroUI imageLink="/home.png">
      <div className="  md:mt-28  text-background fx-col gap-5 justify-start ">
        <h1 className="mb:text-center text-5xl md:text-6xl lg:text-[90px] font-bold  leading-tight ">
          Crafting a Legacy of
          <span className="text-primary"> Literary </span>
          Excellence and Inclusive{" "}
          <span className="text-primary">Creativity</span>
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
const AboutQwaniSection = () => {
  return (
    <div className="web-px pt-20 space-y-5">
      <CustomTitle title="About Qwani" titleNumber={1} />
      <div className="md:ml-20">
        <p className="text-lg">
          At Qwani, we believe in the power of words to unite, inspire, and
          transform. Our journey began with a simple vision: to create a
          sanctuary where every story is cherished, and every voice is heard. We
          are more than just a community; we are a family of dreamers, thinkers,
          and creators.
        </p>
        <p className="text-lg">
          Through our diverse range of events, workshops, and publications, we
          foster an environment where creativity knows no bounds. Our commitment
          to inclusivity and excellence drives us to push the boundaries of
          literature, making it accessible and enjoyable for all. Join us as we
          continue to weave a tapestry of narratives that resonate across
          generations.
        </p>
      </div>
    </div>
  );
};
const OurValuesSection = () => {
  return (
    <div className="web-px mt-10">
      <CustomTitle title="Our Values" titleNumber={2} />
      <div className="w-full fx md:justify-end">
        <p className="md:max-w-[300px]">
          Qwani stands for creativity, inclusivity, and excellence. Were a
          community where every writers voice and story is valued and celebrated
        </p>
      </div>
      <div className="fx-col-mb gap-10 md:gap-5 w-full fx-jb mt-5 ">
        <AboutPageValueCard
          title="Our Vision"
          index={0}
          description="To promote literature among young people."
        />
        <AboutPageValueCard
          title="Our Goal"
          index={10}
          description="To have as many young writers published as possible."
        />
        <AboutPageValueCard
          title="Our Core 
Values"
          index={20}
          description="Creativity, Community, Inclusivity, Excellence—our pillars for literary innovation and unity."
        />
      </div>
    </div>
  );
};
const DetailsCards: React.FC<{}> = () => {
  return (
    <div className="web-px w-full mt-20">
      <div className="fx-col-mb gap-10 md:gap-5 w-full fx-jb ">
        <AboutPageDetailsCard title={900} description="Members." index={0} />
        <AboutPageDetailsCard
          title={100}
          description="Events Done."
          index={10}
        />
        <AboutPageDetailsCard title={100} description="Writers." index={20} />
      </div>
      <div className="gap-2 text-[#D9D9D9] py-20 relative h-[60vh] md:h-[70vh] fx-center fx-col ">
        <Image
          className="absolute z-[-1] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
          src="/imgs/1.jpg"
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
const OurTeamSection = () => {
  return (
    <div className="web-px mt-20">
      <CustomTitle title="Our Team" titleNumber={3} />
      <div className="mt-5 mb-10">
        <TeamMemberWrapper />
      </div>
    </div>
  );
};

export default AboutPage;
