import { HomepageUI } from "@/components/website/pageUIs/homepage/homepageUI";
import { getHomePageContent } from "@/lib/api";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const homepage = await getHomePageContent();
  return (
    <div>
      <HomepageUI blogs={homepage.blogs} />
    </div>
  );
};

export default Page;
