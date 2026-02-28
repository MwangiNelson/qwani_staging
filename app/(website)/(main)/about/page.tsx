import { TeamMemberWrapper } from "@/components/website/shared/Wrappers";
import {
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchAboutPageContent } from "@/lib/api";
import { IAboutPage } from "@/utils/data_types";
import { Metadata } from "next";
import React from "react";
import {
  AboutHero,
  AboutStory,
  AboutStats,
  AboutValues,
  AboutExplore,
  AboutTeam,
} from "@/components/website/pageUIs/about/AboutSections";

async function AboutPage() {
  const about = await fetchAboutPageContent();

  return (
    <div className="min-h-screen">
      <AboutHero about={about} />
      <AboutStory about={about} />
      <AboutStats about={about} />
      <AboutValues about={about} />
      <AboutExplore about={about} />
      <AboutTeam about={about}>
        <TeamMemberWrapper teamMembers={about.teamMembers} />
      </AboutTeam>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("about");
  return results;
}

export default AboutPage;
