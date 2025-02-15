import {
  How_It_Started_Hero,
  HowItStartedImage,
  HowItStartedMain,
} from "@/components/website/pageUIs/how_it_started/how_it_started_hero";
import { MinimalFooter } from "@/components/website/shared/client";
import { fetchHowItStartedPageContent } from "@/lib/api";
import React from "react";

type Props = {};

const HowItStarted = async (props: Props) => {
  const page = await fetchHowItStartedPageContent();
  return (
    <div className="pb-20">
      <How_It_Started_Hero content={page} />
      <HowItStartedImage content={page} />
      <HowItStartedMain content={page} />
      <MinimalFooter />
    </div>
  );
};

export default HowItStarted;
