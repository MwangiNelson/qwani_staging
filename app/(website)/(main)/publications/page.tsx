import {
  QwaniPublicationImages,
  SeparatorTitle,
} from "@/components/website/pageUIs";
import { PublicationCards } from "@/components/website/shared/cards/common";
import { formatSanityDate } from "@/components/website/utils/functions";
import { fetchPublicationPage } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IPublicationsPage } from "@/utils/data_types";
import Image from "next/image";

const Publications = async () => {
  const publicationsPage = await fetchPublicationPage();
  if (!publicationsPage) return null;

  return (
    <div>
      <HeroSection content={publicationsPage} />
      <PublicationsImagesSection content={publicationsPage} />
      <PublicationsSection content={publicationsPage} />
    </div>
  );
};
const HeroSection = ({ content }: { content: IPublicationsPage }) => {
  return (
    <div className="bg-foreground web-px h-screen text-background   pt-48">
      <div className="fx-col gap-3">
        <h1 className="ts3 font-bold">{content.heroTitle}</h1>
        <p className="">{content.heroSubtitle}</p>
      </div>
    </div>
  );
};
const PublicationsImagesSection = ({
  content,
}: {
  content: IPublicationsPage;
}) => {
  return (
    <div className="-mt-[30vh] md:-mt-[40vh]  web-px">
      <Image
        alt="CONTACT IMAGE"
        src={imageUrl(content.heroImage)}
        width={1920}
        height={1080}
        className="h-[50vh] md:h-[70vh] object-cover"
      />
    </div>
  );
};

const PublicationsSection = ({ content }: { content: IPublicationsPage }) => {
  return (
    <div className="web-px mt-14 mb-20">
      <SeparatorTitle title={content.publicationsTitle} />
      <div className="mt-10 ">
        <div className="grid   gap-5  md:gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
          {content.publications.map((item, index) => {
            return (
              <PublicationCards
                key={index}
                imageUrl={imageUrl(item.coverImage)}
                title={item.title}
                paragraph={item.description}
                date={formatSanityDate(item.publishDate)}
                link={`/publications/${item._id}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Publications;
