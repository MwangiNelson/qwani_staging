"use client";
import { Card, CardContent } from "@/components/ui/card";
import { imageUrl } from "@/sanity/lib/client";
import { ISanityAsset } from "@/utils/data_types";
import Image from "next/image";
import React from "react";
import { Lightbox } from "yet-another-react-lightbox";

export const GalleryCard = ({
  image,
  setSelectedImage,
}: {
  image: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <Card
      onClick={() => {
        setSelectedImage(image);
      }}
      className="border-none bg-foreground text-background cursor-pointer"
    >
      <CardContent className="p-0 space-y-3 ">
        <div className="h-[300px] md:h-[400px] overflow-hidden">
          <Image
            src={image}
            alt="Gallery Image"
            width={500}
            className="h-full w-full object-cover "
            height={500}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export const GalleryCards = ({ images }: { images: ISanityAsset[] }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  return (
    <div className="gap-5 web-px grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
      <Lightbox
        open={!!selectedImage}
        close={() => setSelectedImage(null)}
        slides={[
          { src: selectedImage || "/imgs/1.jpg" },
          ...images
            .filter((image) => imageUrl(image) !== selectedImage)
            .map((image) => ({
              src: imageUrl(image),
            })),
        ]}
      />

      {images.map((item, i) => (
        <GalleryCard
          key={i}
          image={imageUrl(item)}
          setSelectedImage={setSelectedImage}
        />
      ))}
    </div>
  );
};
