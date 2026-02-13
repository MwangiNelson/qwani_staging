import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BlogCategoriesFilter,
  AllBlogsCards,
  TrendingBlogsWrapper,
} from "@/components/website/pageUIs/blogs";
import {
  BlogCardFeatured,
  BlogCardEditorial,
  BlogCardHorizontal,
} from "@/components/website/shared/cards/blogs";
import {
  formatSanityText,
  pageMetadata,
} from "@/components/website/utils/functions";
import { fetchBlogs, fetchBlogsPageContent, fetchCategories } from "@/lib/api";
import { IBlogsPage, IPost, IPostCategory } from "@/utils/data_types";
import { PenIcon, Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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

// Editorial Hero Section
const HeroSection = ({ content, blogs }: IContent) => {
  const featuredBlog = blogs[0];
  const secondaryBlogs = blogs.slice(1, 4);

  return (
    <section className="editorial-bg-charcoal">
      {/* Header */}
      <div className="web-px pt-28 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-primary text-sm font-dm-sans font-medium tracking-wider uppercase mb-4">
            <Sparkles className="h-4 w-4" />
            Stories & Insights
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            {formatSanityText(content.heroTitle, "text-primary")}
          </h1>
          <p className="font-dm-sans text-white/70 text-lg max-w-2xl mx-auto">
            Discover stories, insights, and creative works from our community of young writers.
          </p>
        </div>
      </div>

      {/* Featured Content */}
      <div className="web-px pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Featured */}
          <div className="lg:col-span-2">
            {featuredBlog && <BlogCardFeatured blog={featuredBlog} />}
          </div>

          {/* Secondary Stories */}
          <div className="space-y-0">
            <div className="pb-2 mb-4 border-b border-white/10">
              <h3 className="font-dm-sans text-xs font-semibold text-white/50 uppercase tracking-wider">
                More Stories
              </h3>
            </div>
            {secondaryBlogs.map((blog, index) => (
              <BlogCardHorizontal key={index} blog={blog} variant="dark" />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed z-50 bottom-8 right-8">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:scale-105 transition-transform"
          asChild
        >
          <Link href="/blogs/how-to-publish-with-qwani">
            <PenIcon className="h-5 w-5" />
            <span className="sr-only">How to publish</span>
          </Link>
        </Button>
      </div>
    </section>
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
