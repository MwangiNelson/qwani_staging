import {
  QwaniPublicationImages,
  SeparatorTitle,
} from "@/components/website/pageUIs";
import React from "react";

export default function page() {
  return (
    <div>
      <HeroSection />
      <PublicationsImagesSection />
      <Publications />
    </div>
  );
}
const HeroSection = () => {
  return (
    <div className="bg-foreground web-px h-screen text-background   pt-48">
      <div className="fx-col gap-3">
        <h1 className="ts3 font-bold">QWANI PUBLICATIONS</h1>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit.
        </p>
      </div>
    </div>
  );
};
const PublicationsImagesSection = () => {
  const images = ["/book2.png"];
  return (
    <div className="-mt-[30vh] md:-mt-[40vh] web-px">
      <QwaniPublicationImages images={images} />
    </div>
  );
};

const Publications = () => {
  return (
    <div className="web-px mt-14">
      <SeparatorTitle title="Our Publications" />
    </div>
  );
};
