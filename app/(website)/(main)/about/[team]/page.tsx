import { Badge } from "@/components/ui/badge";
import Lost from "@/components/website/lost";
import { MinimalFooter } from "@/components/website/shared/client";
import { defaultMetadata } from "@/components/website/utils/functions";
import { fetchTeamMemberBySlug } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { Props } from "@/utils/uitypes";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { TeamMemberDetailHero } from "@/components/website/pageUIs/about/TeamMemberDetailHero";

const Page = async ({ params: { team } }: Props) => {
  const member = await fetchTeamMemberBySlug(team as string);
  if (!member) return <Lost />;
  return (
    <div className="min-h-screen">
      <TeamMemberDetailHero member={member} />
      <MinimalFooter />
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
