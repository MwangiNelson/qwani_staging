import {
  How_It_Started_Hero,
  HowItStartedImage,
  HowItStartedMain,
} from "@/components/website/pageUIs/how_it_started/how_it_started_hero";
import React from "react";

type Props = {};

const HowItStarted = (props: Props) => {
  return (
    <div>
      <How_It_Started_Hero />
      <HowItStartedImage />
      <HowItStartedMain />
    </div>
  );
};

export default HowItStarted;
