import { Button } from "@/components/ui/button";
import { MinimalFooter } from "@/components/website/shared/client";
import { Sharing } from "@/components/website/shared/sharing";
import { BackButton } from "@/components/website/utils";
import { formatSanityDate } from "@/components/website/utils/functions";
import { myPortableTextComponents } from "@/components/website/utils/sanity_components";
import { fetchWriterById, fetchWriterBySlug } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IWriter } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import { Metadata, ResolvingMetadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
const Page = async ({
  params,
}: {
  params: {
    writer: string;
  };
}) => {
  const writer = await fetchWriterBySlug(params.writer);
  return (
    <div className="bg-foreground min-h-screen text-background">
      <HeroSection writer={writer} />
      <MinimalFooter />
    </div>
  );
};
const HeroSection = ({ writer }: { writer: IWriter }) => {
  return (
    <div className="web-px py-32 space-y-2 ">
      <div className="fx flex-col items-start gap-2">
        <Button variant={"noEffect"} className="p-0 -ml-2" asChild>
          <BackButton />
        </Button>
        <span className="font-semibold">
          {formatSanityDate(writer._createdAt)}
        </span>
        <h3 className="ts4 font-semibold">{writer.name}</h3>
      </div>

      <Image
        src={imageUrl(writer.image.asset)}
        alt="Writer"
        width={1000}
        height={1000}
        className="rounded-md h-[350px] md:h-[500px] object-cover object-center mt-5"
      />
      <div className="flex justify-end pt-10">
        <Sharing bg="foreground" />
      </div>
      <div className="prose  txe-white">
        <PortableText
          value={writer.description}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  );
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await fetchWriterBySlug(params.writer as string);
  return {
    title: data.name,
    description: `${data.name} is a writer on Qwani.`,
    keywords: "Qwani, young writers, events, writing, literature",
    openGraph: {
      title: data.name,
      description: `${data.name} is a writer on Qwani.`,
      images: [
        {
          url: imageUrl(data.image.asset || data.image),
          width: 1200,
          height: 630,
          alt: data.name,
        },
      ],
    },
  };
}
export default Page;
