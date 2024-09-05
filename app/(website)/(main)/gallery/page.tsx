import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MinimalFooter } from "@/components/website/shared/client";
import {
  formatSanityDate,
  pageMetadata,
} from "@/components/website/utils/functions";
import {
  fetchGalleries,
  fetchGalleryById,
  fetchGalleryPageContent,
} from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IGallery, IGalleryPage } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Gallery = async () => {
  const [content, gallery = []] = await Promise.all([
    fetchGalleryPageContent(),
    fetchGalleries(),
  ]);
  if (!content) return null;
  return (
    <div className="min-h-screen bg-foreground text-background pt-40 pb-20 space-y-10 ">
      <HeroSection content={content} />
      <Separator className="mt-10 bg-background/50" />
      <GalleryCards gallery={gallery} />
      <MinimalFooter />
    </div>
  );
};

const HeroSection = ({ content }: { content: IGalleryPage }) => {
  return (
    <div className="gallery-px">
      <div className="fx flex-col  md:justify-between md:flex-row gap-2 md:gap-32 lg:gap-40">
        <h1 className="ts1">{content.title}</h1>
        <p className="pt-2">{content.description}</p>
      </div>
    </div>
  );
};
const GalleryCard = ({ item }: { item: IGallery }) => {
  return (
    <Card className="border-none bg-foreground text-background cursor-pointer">
      <Link
        href={`
      /gallery/${item._id}
      `}
      >
        <CardContent className="p-0 space-y-3 ">
          <div className="h-[400px] overflow-hidden">
            <Image
              src={imageUrl(item.featuredImage)}
              alt="Gallery Image"
              width={500}
              className="h-full object-cover hover:scale-110 transition-all duration-300"
              height={500}
            />
          </div>
          <p className="ts5">{item.title}</p>
        </CardContent>
      </Link>
    </Card>
  );
};

const GalleryCards = ({ gallery }: { gallery: IGallery[] }) => {
  //sort by date, from upcoming to past
  const sortedGallery = gallery.sort((a, b) => {
    const date = new Date(b.date).getTime() - new Date(a.date).getTime();

    return date;
  });
  sortedGallery.map((a) => {
    console.log({
      event1: {
        name: a.title,
        date: formatSanityDate(a.date),
        dateUnformatted: a.date,
      },
    });
  });
  return (
    <div className="gap-10 web-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
      {sortedGallery &&
        sortedGallery.map((item, i) => <GalleryCard key={i} item={item} />)}
    </div>
  );
};
export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("gallery");

  return results;
}
export default Gallery;
