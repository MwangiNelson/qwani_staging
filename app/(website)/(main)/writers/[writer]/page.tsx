import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileCardWithBookMark } from "@/components/website/shared/cards/common";
import { MinimalFooter } from "@/components/website/shared/client";
import { Sharing } from "@/components/website/shared/sharing";
import { BackButton } from "@/components/website/utils";
import { formatSanityDate } from "@/components/website/utils/functions";
import { myPortableTextComponents } from "@/components/website/utils/sanity_components";
import { fetchWriterById } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IWriter } from "@/utils/data_types";
import { ChevronLeft } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Page = async ({
  params,
}: {
  params: {
    writer: string;
  };
}) => {
  const writer = await fetchWriterById(params.writer);
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
        className="rounded-md h-[350px] object-cover object-center mt-5"
      />
      <div className="flex justify-end pt-10">
        <Sharing bg="foreground" />
      </div>
      <div
        className="prose  "
        style={{
          color: "#fff !important",
        }}
      >
        <PortableText
          value={writer.description}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  );
};
export default Page;
