import { Button } from "@/components/ui/button";
import { SeparatorTitle } from "@/components/website/pageUIs";
import { HeroUI } from "@/components/website/shared/CommonUi";
import { WritersWrapper } from "@/components/website/shared/Wrappers";
import {
  formatSanityDate,
  formatSanityText,
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchWriters, fetchWritersPage } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IWriter, IWritersPage } from "@/utils/data_types";
import { Metadata } from "next";
import React from "react";

const Writers = async () => {
  const writersPage = await fetchWritersPage();
  if (!writersPage) {
    return null;
  }
  const writers = writersPage.writers;
  return (
    <div className="">
      <HeroSection content={writersPage} />
      <WritersSection writers={writers} />
    </div>
  );
};

const HeroSection = ({ content }: { content: IWritersPage }) => {
  return (
    <HeroUI bgtype="default" imageLink={imageUrl(content.heroImage)}>
      <div className="text-background  fx-col gap-5 justify-start md:mt-28 ">
        <h1 className=" h1 text-center ">
          {formatSanityText(content.heroTitle, "text-primary")}
        </h1>
        <p className="text-xl text-center">{content.heroSubtitle}</p>
        <div className="w-full place-content-center fx">
          <Button asChild>
            <a href={content.ctaButtonLink}>{content.ctaText}</a>
          </Button>
        </div>
      </div>
    </HeroUI>
  );
};

const WritersSection = ({ writers }: { writers: IWriter[] }) => {
  return (
    <div className="web-px py-20 space-y-10 bg-bgsecondary">
      <SeparatorTitle title="Our Writers" />
      <WritersWrapper writers={writers} />
    </div>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("writers");
  return results;
}
export default Writers;
