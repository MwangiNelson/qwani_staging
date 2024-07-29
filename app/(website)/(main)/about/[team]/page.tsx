import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MinimalFooter } from "@/components/website/shared/client";
import { Sharing } from "@/components/website/shared/sharing";
import { BackButton } from "@/components/website/utils";
import { myPortableTextComponents } from "@/components/website/utils/sanity_components";
import { fetchTeamMemberById } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { ITeamMember } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import { Metadata, ResolvingMetadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Page = async ({ params: { team } }: Props) => {
  const member = await fetchTeamMemberById(team as string);
  if (!member) return <div>404</div>;
  return (
    <div className="bg-foreground min-h-screen text-background">
      <HeroSection member={member} />
      <MinimalFooter />
    </div>
  );
};
const HeroSection = ({ member }: { member: ITeamMember }) => {
  return (
    <div className="web-px py-32 space-y-2 ">
      <div className="fx flex-col items-start gap-2">
        <BackButton text="Go Back" />
        {/* <span className="font-semibold">Jan 13, 2024</span> */}
        <Badge className="blur-bg ">{member.role}</Badge>
        <h3 className="ts4 font-semibold">{member.name}</h3>
      </div>

      <Image
        src={imageUrl(member.image)}
        alt={member.name}
        width={1000}
        height={1000}
        className="rounded-md h-[350px] md:h-[500px] object-cover object-center"
      />
      <div className="flex justify-end pt-10">
        <Sharing bg="foreground" />
      </div>

      <div className="prose text-background">
        <PortableText
          value={member.description}
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
  const data = await fetchTeamMemberById(params.team as string);
  return {
    title: data.name,
    keywords: "Qwani, young writers, events, writing, literature",
    openGraph: {
      title: data.name,

      images: [
        {
          url: imageUrl(data.image.asset || data.image),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
export default Page;
