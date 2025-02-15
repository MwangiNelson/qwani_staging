import {
  How_It_Started_Hero,
  HowItStartedImage,
  HowItStartedMain,
} from "@/components/website/pageUIs/how_it_started/how_it_started_hero";
import { MinimalFooter } from "@/components/website/shared/client";
import { pageMetadata } from "@/components/website/utils/functions";
import { fetchHowItStartedPageContent } from "@/lib/api";
import { Metadata } from "next";
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
export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("how-it-started");
  return results;
}
export default HowItStarted;
