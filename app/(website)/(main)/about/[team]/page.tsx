import { Badge } from "@/components/ui/badge";
import Lost from "@/components/website/lost";
import { MinimalFooter } from "@/components/website/shared/client";
import Portable_Text_Editor from "@/components/website/shared/portable_text_editor";
import { Sharing } from "@/components/website/shared/sharing";
import { BackButton } from "@/components/website/utils";
import { defaultMetadata } from "@/components/website/utils/functions";
import { myPortableTextComponents } from "@/components/website/utils/sanity_components";
import { fetchTeamMemberById, fetchTeamMemberBySlug } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { ITeamMember } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import { Metadata, ResolvingMetadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

const Page = async ({ params: { team } }: Props) => {
  const member = await fetchTeamMemberBySlug(team as string);
  if (!member) return <Lost />;
  return (
    <div className="team-member-px bg-foreground min-h-screen text-background">
      <HeroSection member={member} />
      <MinimalFooter />
    </div>
  );
};
const HeroSection = ({ member }: { member: ITeamMember }) => {
  return (
    <div className=" py-32 space-y-2 ">
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
        className="rounded-md h-[350px] md:h-[500px] w-full object-cover object-center"
      />
      <div className="flex justify-end pt-10">
        <Sharing bg="foreground" />
      </div>

      <div className="prose text-background">
        {/* <PortableText
          value={member.description}
          components={myPortableTextComponents}
        /> */}
        <Portable_Text_Editor body={member.description} />
      </div>
    </div>
  );
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await fetchTeamMemberBySlug(params.team as string);
  if (!data) {
    return defaultMetadata();
  }
  return {
    title: data?.name,
    keywords: "Qwani, young writers, events, writing, literature",
    openGraph: {
      title: data?.name,

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
