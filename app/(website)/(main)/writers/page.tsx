import { Button } from "@/components/ui/button";
import { SeparatorTitle } from "@/components/website/pageUIs";
import { HeroUI } from "@/components/website/shared/CommonUi";
import { WritersWrapper } from "@/components/website/shared/Wrappers";
import React from "react";

const Writers = () => {
  return (
    <div className="">
      <HeroSection />
      <WritersSection />
    </div>
  );
};

const HeroSection = () => {
  return (
    <HeroUI bgtype="default" imageLink="/writing.jpg">
      <div className="text-background  fx-col gap-5 justify-start md:mt-28 ">
        <h1 className=" h1 text-center ">
          Meet Our
          <span className="text-primary"> Writers</span>
        </h1>
        <p className="text-xl text-center">
          This time, our tour will be at the Kenya Railways Museum as a
          continuation of our previous tour around the area. We will learn the
          History of the Uganda Railway/Lunat
        </p>
        <div className="w-full place-content-center fx">
          <Button>Join Our Writers</Button>
        </div>
      </div>
    </HeroUI>
  );
};

const WritersSection = () => {
  return (
    <div className="web-px py-20 space-y-10 bg-bgsecondary">
      <SeparatorTitle title="Our Writers" />
      <WritersWrapper />
    </div>
  );
};

export default Writers;
