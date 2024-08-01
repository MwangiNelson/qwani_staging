import { Separator } from "@/components/ui/separator";
import { GalleryCards } from "@/components/website/pageUIs/gallery";
import { MinimalFooter } from "@/components/website/shared/client";
import { fetchGalleryById } from "@/lib/api";
import { IGallery } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import React from "react";

const Gallery = async ({ params }: Props) => {
  const gallery = await fetchGalleryById(params.gallery as string);
  if (!gallery) return null;
  return (
    <div className="min-h-screen bg-foreground text-background pt-40 pb-20 space-y-10 ">
      <HeroSection gallery={gallery} />
      <Separator className="mt-10 bg-background/50" />
      <GalleryCards images={gallery.galleryImages} />
      <MinimalFooter />
    </div>
  );
};

const HeroSection = ({ gallery }: { gallery: IGallery }) => {
  return (
    <div className="gallery-px">
      <div className="fx flex-col">
        <h1 className="ts1">{gallery.title}</h1>
        <p className="pt-2">{gallery.description}</p>
      </div>
    </div>
  );
};

export default Gallery;
