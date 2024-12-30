import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Lost from "@/components/website/lost";
import {
  MakeActiveLink,
  MinimalFooter,
} from "@/components/website/shared/client";
import {
  AuthorsBlogs,
  AuthorsWrapper,
} from "@/components/website/shared/Wrappers";
import { BackButton } from "@/components/website/utils";
import { fetchAuthorBySlug, fetchAuthors, fetchBlogsByAuthor } from "@/lib/api";
import { IAuthor, IPost } from "@/utils/data_types";
import { PageProps } from "@/utils/uitypes";
import Link from "next/link";
import React from "react";

const Contributer = async ({
  params: { contributer },
}: PageProps<"contributer">) => {
  const writer = await fetchAuthorBySlug(contributer);
  const blogs = await fetchBlogsByAuthor(writer?._id);

  if (!writer) return <Lost />;
  return (
    <div className="bg-[#F2F2F2] pb-20">
      <HeroSection writer={writer} />
      <BlogsSection blogs={blogs} />
      <MinimalFooter />
      <MakeActiveLink activeLink="writers" />
    </div>
  );
};
const HeroSection = ({ writer }: { writer: IAuthor }) => {
  return (
    <div className="bg-foreground web-px text-background space-y-2 min-h-[85vh] pt-40">
      <div className="fx flex-col items-start gap-2">
        <BackButton text="Go Back" />
        <Badge className="blur-bg ">Contributer</Badge>
        <h3 className="ts4 font-semibold">{writer.name}</h3>
        <p>{writer.bio} </p>
      </div>
    </div>
  );
};
const BlogsSection = ({ blogs }: { blogs: IPost[] }) => {
  return (
    <div className=" w-full min-h-screen web-px pt-10">
      <AuthorsBlogs blogs={blogs} />
    </div>
  );
};
export default Contributer;
