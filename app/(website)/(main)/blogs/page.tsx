import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BlogCategoriesFilter,
  AllBlogsCards,
  TrendingBlogsWrapper,
} from "@/components/website/pageUIs/blogs";
import {
  BlogCardMain,
  BlogListHero,
} from "@/components/website/shared/cards/blogs";
import {
  formatSanityText,
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchBlogs, fetchBlogsPageContent, fetchCategories } from "@/lib/api";
import { IBlogsPage, IPost, IPostCategory } from "@/utils/data_types";
import { PenIcon, Search } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
interface IContent {
  content: IBlogsPage;
}
const Blogs = async () => {
  const [content, categories, blogs] = await Promise.all([
    fetchBlogsPageContent(),
    fetchCategories(),
    fetchBlogs(),
  ]);

  return (
    <div>
      <HeroSection content={content} />
      <TrendingBlogs content={content} />
      <BlogCategories categories={categories} blogs={blogs} />
      <AllBlogs blogs={blogs} />
    </div>
  );
};
const HeroSection = ({ content }: IContent) => {
  return (
    <div className="bg-foreground min-h-screen web-px  relative text-background pt-32 pb-20">
      <div className="fx-center ">
        <h1 className="ts3 max-w-screen-md text-center font-semibold">
          {formatSanityText(content.heroTitle, "text-primary")}
        </h1>
      </div>
      <div className="fixed z-[6] -right-2 web-px top-32 fx-col">
        {/* <Button variant={"noEffect"} size={"icon"}>
          <Search size={15} />
        </Button> */}
        <Button variant={"noEffect"} size={"icon"} asChild>
          <Link
            target="_blank"
            href={`mailto:qwanitrust@gmail.com?subject=Blog Submission
          `}
          >
            <PenIcon size={15} />
          </Link>
        </Button>
      </div>
      <div className="blog-px fx flex-col md:flex-row mt-10  gap-14 md:gap-10">
        <BlogCardMain bg="foreground" blog={content.heroBlog} />
        <BlogListHero blogs={content.heroBlogs} />
      </div>
    </div>
  );
};
const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="fx-col">
      <h1 className="ts5 font-semibold ">{title}</h1>
      <Separator className="bg-secondary h-[2px]" />
    </div>
  );
};
const TrendingBlogs = ({ content }: IContent) => {
  return (
    <div className="bg-[#F2F2F2] py-10 web-px">
      <div className="fx-center">
        <PageTitle title={content.trendingTitle} />
      </div>
      <div className="mt-7 ">
        <TrendingBlogsWrapper blogs={content.trendingBlogs} />
      </div>
    </div>
  );
};
const BlogCategories = ({
  categories,
  blogs,
}: {
  categories: IPostCategory[];
  blogs: IPost[];
}) => {
  return (
    <div className="mt-10">
      <div className="fx-center">
        <PageTitle title={"Blog categories"} />
      </div>
      <BlogCategoriesFilter blogs={blogs} categories={categories} />
    </div>
  );
};
const AllBlogs = ({ blogs }: { blogs: IPost[] }) => {
  return (
    <div className="bg-[#F2F2F2] mt-10 py-10 web-px">
      <div className="fx-center">
        <PageTitle title={"All Blogs"} />
      </div>
      <AllBlogsCards blogs={blogs} />
    </div>
  );
};
export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("blogs");
  return results;
}
export default Blogs;
