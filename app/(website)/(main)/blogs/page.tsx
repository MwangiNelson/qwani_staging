import {
  BlogCategoriesFilter,
  AllBlogsCards,
  TrendingBlogsWrapper,
} from "@/components/website/pageUIs/blogs";
import HeroSection from "@/components/website/pageUIs/blogs/HeroSection";
import {
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchBlogs, fetchBlogsPageContent, fetchCategories } from "@/lib/api";
import { IBlogsPage, IPost, IPostCategory } from "@/utils/data_types";
import { Metadata } from "next";
import React from "react";

interface IContent {
  content: IBlogsPage;
  blogs: IPost[];
}

const Blogs = async () => {
  const [content, categories, blogs] = await Promise.all([
    fetchBlogsPageContent(),
    fetchCategories(),
    fetchBlogs(),
  ]);

  return (
    <div className="min-h-screen">
      <HeroSection content={content} blogs={blogs} />
      <TrendingBlogs content={content} blogs={blogs} />
      <BlogCategories categories={categories} blogs={blogs} />
      <AllBlogs blogs={blogs} />
    </div>
  );
};

// Section Title Component
const SectionTitle = ({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) => {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="font-dm-sans text-muted-foreground mt-2">{subtitle}</p>
      )}
      <div
        className={`editorial-divider mt-4 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};

// Trending Blogs Section
const TrendingBlogs = ({ content }: IContent) => {
  return (
    <section className="editorial-bg-ivory py-16 md:py-20">
      <div className="web-px">
        <SectionTitle
          title={content.trendingTitle || "Trending Now"}
          subtitle="Popular stories our readers are loving"
        />
        <div className="mt-10">
          <TrendingBlogsWrapper blogs={content.trendingBlogs} />
        </div>
      </div>
    </section>
  );
};

// Blog Categories Section
const BlogCategories = ({
  categories,
  blogs,
}: {
  categories: IPostCategory[];
  blogs: IPost[];
}) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="web-px">
        <SectionTitle
          title="Explore by Category"
          subtitle="Find stories that match your interests"
        />
        <div className="mt-10">
          <BlogCategoriesFilter blogs={blogs} categories={categories} />
        </div>
      </div>
    </section>
  );
};

// All Blogs Section
const AllBlogs = ({ blogs }: { blogs: IPost[] }) => {
  return (
    <section className="editorial-bg-ivory py-16 md:py-20">
      <div className="web-px">
        <SectionTitle
          title="All Stories"
          subtitle="Browse our complete collection"
        />
        <div className="mt-10">
          <AllBlogsCards blogs={blogs} />
        </div>
      </div>
    </section>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const results = await pageMetadata("blogs");
  return results;
}

export default Blogs;
