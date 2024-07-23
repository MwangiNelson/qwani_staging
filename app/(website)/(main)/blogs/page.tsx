import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BlogCategoriesFilter,
  TrendingBlogsWrapper,
} from "@/components/website/pageUIs/blogs";
import {
  BlogListHero,
  MainBlogCardHero,
} from "@/components/website/shared/cards/blogs";
import { Bookmark, PenIcon, Search } from "lucide-react";
import React from "react";

const Blogs = () => {
  return (
    <div>
      <HeroSection />
      <TrendingBlogs />
      <BlogCategories />
    </div>
  );
};
const HeroSection = () => {
  return (
    <div className="bg-foreground min-h-screen web-px  relative text-background pt-32 pb-20">
      <div className="fx-center ">
        <h1 className="ts3 max-w-screen-md text-center font-semibold">
          Were have
          <span className="text-primary"> Trending </span>
          and Latest
          <span className="text-primary"> Blogs </span>
          For You
        </h1>
      </div>
      <div className="absolute -right-2 web-px top-32 fx-col">
        <Button variant={"noEffect"} size={"icon"}>
          <Search size={15} />
        </Button>
        <Button variant={"noEffect"} size={"icon"}>
          <PenIcon size={15} />
        </Button>
      </div>
      <div className="blog-px fx flex-col md:flex-row mt-10  gap-14 md:gap-10">
        <MainBlogCardHero />
        <BlogListHero />
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
const TrendingBlogs = () => {
  return (
    <div className="bg-[#F2F2F2] py-10 web-px">
      <div className="fx-center">
        <PageTitle title={"Trending Blogs"} />
      </div>
      <div className="mt-7">
        <TrendingBlogsWrapper />
      </div>
    </div>
  );
};
const BlogCategories = () => {
  return (
    <div className="mt-10">
      <div className="fx-center">
        <PageTitle title={"Featured Blogs"} />
      </div>
      <BlogCategoriesFilter />
    </div>
  );
};
export default Blogs;
