import { Button } from "@/components/ui/button";
import {
  MakeActiveLink,
  MinimalFooter,
} from "@/components/website/shared/client";
import { AuthorsWrapper } from "@/components/website/shared/Wrappers";
import { fetchAuthors, fetchContributersPage } from "@/lib/api";
import { IAuthor, IContributersPage } from "@/utils/data_types";
import Link from "next/link";
import React from "react";

const Contributers = async () => {
  const writers = await fetchAuthors();
  const page_content = await fetchContributersPage();
  console.log(page_content);
  return (
    <div className="bg-[#F2F2F2] pb-20">
      <HeroSection page_content={page_content} />
      <Writers writers={writers} />
      <MinimalFooter />
      <MakeActiveLink activeLink="writers" />
    </div>
  );
};
const HeroSection: React.FC<{
  page_content: IContributersPage;
}> = ({ page_content }) => {
  return (
    <div className="bg-foreground web-px text-background space-y-2 min-h-[85vh] pt-40">
      <h3 className="ts2 font-semibold">{page_content.title}</h3>
      <p className="p">{page_content.description}</p>
      {page_content.btnText && page_content.post && (
        <Button variant={"outlineNoEffect"}>
          <Link href={`/blog/${page_content.post.slug.current}`}>
            {page_content.btnText}
          </Link>
        </Button>
      )}
    </div>
  );
};
const Writers = ({ writers }: { writers: IAuthor[] }) => {
  return (
    <div className=" w-full min-h-screen web-px">
      <AuthorsWrapper authors={writers} />
    </div>
  );
};
export default Contributers;
