import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { MinimalFooter } from "@/components/website/shared/client";
import { BackButton } from "@/components/website/utils";
import { Props } from "@/utils/uitypes";
import { fetchPublicationById, fetchPublicationBySlug } from "@/lib/api";
import { IPublication } from "@/utils/data_types";
import {
  defaultMetadata,
  formatSanityDate,
} from "@/components/website/utils/functions";
import { imageUrl } from "@/sanity/lib/client";
import { Sharing } from "@/components/website/shared/sharing";
import { Metadata, ResolvingMetadata } from "next";
import Lost from "@/components/website/lost";
import Portable_Text_Editor from "@/components/website/shared/portable_text_editor";
const Publication = async ({ params }: Props) => {
  const publication = await fetchPublicationBySlug(
    params.publication as string
  );
  if (!publication) return <Lost />;
  return (
    <div className="pb-20">
      <HeroSection publication={publication} />
      <PublicationsImagesSection publication={publication} />
      <Details publication={publication} />
      <MinimalFooter />
    </div>
  );
};
const HeroSection = ({ publication }: { publication: IPublication }) => {
  return (
    <div className="bg-foreground web-px min-h-[90vh] md:h-screen text-background pt-36 md:pt-40">
      <div className="fx-col gap-1">
        <div>
          <BackButton text="Back To Publications" />
        </div>
        <h4 className="ts7  font-bold text-primary">
          Published{formatSanityDate(publication.publishDate)}
        </h4>
        <h3 className="ts3 font-semibold">
          {publication.title}
          <span className="ts6 font-thin italic"> {publication.author}</span>
        </h3>

        <p className="">{publication.description}</p>
        <div className="fx-jb">
          <div className="flex gap-2 mt-2">
            {/* <Badge className="bg-background text-foreground h-[35px]">
              KSH {publication.price}
            </Badge> */}
            <Button
              variant={"noEffect"}
              size="sm"
              className="border border-primary text-primary rounded-full px-5"
            >
              KSH {publication.price}
            </Button>
          </div>
          {/* <Button
            variant={"noEffect"}
            size="sm"
            className="border border-background text-background rounded-full"
          >
            <span>Buy Ticket</span>
            <FaAngleRight />
          </Button> */}
        </div>
      </div>
    </div>
  );
};
const PublicationsImagesSection = ({
  publication,
}: {
  publication: IPublication;
}) => {
  return (
    <div className="-mt-[23vh]  web-px">
      <Image
        alt={publication.title}
        src={imageUrl(publication.coverImage)}
        width={1920}
        height={1080}
        className="h-[50vh] md:h-[60vh] object-cover"
      />
    </div>
  );
};
const Details = ({ publication }: { publication: IPublication }) => {
  return (
    <div className="web-px mt-5">
      <div className="fx flex-col md:flex-row md:justify-between mt-10">
        <div className="fx-col">
          <h3 className="ts5 font-semibold">Genre</h3>
          <p>
            {publication?.genre?.map((genre, index) => (
              <span key={index} className="mr-2">
                {genre}
              </span>
            ))}
          </p>
        </div>
        <div className="fx-a-center gap-2">
          <Sharing />
        </div>
      </div>
      <div className="ts5 mt-4 font-semibold">Description</div>
      <Portable_Text_Editor body={publication.content} />
    </div>
  );
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await fetchPublicationBySlug(params.publication as string);
  if (!data) {
    return defaultMetadata();
  }
  return {
    title: data.title,
    description: data.description,
    keywords: "Qwani, young writers, events, writing, literature",
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: imageUrl(data.coverImage),
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  };
}
export default Publication;
