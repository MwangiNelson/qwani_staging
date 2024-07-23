import {
  QwaniPublicationImages,
  SeparatorTitle,
} from "@/components/website/pageUIs";
import { PublicationCards } from "@/components/website/shared/cards/common";
import Image from "next/image";

const Publications = () => {
  return (
    <div>
      <HeroSection />
      <PublicationsImagesSection />
      <PublicationsSection />
    </div>
  );
};
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
  return (
    <div className="-mt-[30vh] md:-mt-[40vh]  web-px">
      <Image
        alt="CONTACT IMAGE"
        src="/book2.png"
        width={1920}
        height={1080}
        className="h-[50vh] md:h-[70vh] object-cover"
      />
    </div>
  );
};

const PublicationsSection = () => {
  const publications = [
    {
      imageUrl: "/book1.png",
      title: "QWANI BOOK 1",
      paragraph:
        "The book starts with Museo explaining the issue of non-consensual sex from a female perspective...",
      date: "Published April 1, 2023",
    },
    {
      imageUrl: "/book2.png",
      title: "Qwani Book 2",
      paragraph:
        "The book starts with Museo explaining the issue of non-consensual sex from a female perspective...",
      date: "Published April 1, 2023",
    },
  ];

  return (
    <div className="web-px mt-14 mb-20">
      <SeparatorTitle title="Our Publications" />
      <div className="mt-10 ">
        <div className="grid   gap-5  md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
          {publications.map((item, index) => {
            return (
              <PublicationCards
                key={index}
                imageUrl={item.imageUrl}
                title={item.title}
                paragraph={item.paragraph}
                date={item.date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Publications;
