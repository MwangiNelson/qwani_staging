import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Lost from "@/components/website/lost";
import CommentsBlogs from "@/components/website/pageUIs/blogs/comments.blogs";
import { MinimalFooter } from "@/components/website/shared/client";
import Portable_Text_Editor from "@/components/website/shared/portable_text_editor";
import { Sharing } from "@/components/website/shared/sharing";
import {
  defaultMetadata,
  formatSanityDate,
} from "@/components/website/utils/functions";
import { fetchBlogBySlug } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IPost } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

const Page = async ({ params, searchParams }: Props) => {
  const blog = await fetchBlogBySlug(params.blog as string);
  if (!blog) {
    return <Lost />;
  }
  return (
    <article className="min-h-screen bg-white">
      <BlogHeader blog={blog} />
      <BlogHeroImage blog={blog} />
      <BlogContent blog={blog} />
      <AuthorCard blog={blog} />
      <CommentsSection blog={blog} />
      <MinimalFooter />
    </article>
  );
};

// Header with back navigation and meta
const BlogHeader = ({ blog }: { blog: IPost }) => {
  const isComic = blog.postType === "comic";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
      <div className="web-px py-4">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-dm-sans text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Stories</span>
          </Link>

          {/* Share */}
          <Sharing bg="foreground" />
        </div>
      </div>
    </header>
  );
};

// Hero Image Section
const BlogHeroImage = ({ blog }: { blog: IPost }) => {
  const isComic = blog.postType === "comic";

  if (isComic) return null;

  return (
    <section className="relative">
      <div className="aspect-[21/9] md:aspect-[3/1] relative overflow-hidden bg-gray-100">
        <Image
          src={imageUrl(blog.mainImage?.asset || blog.mainImage)}
          alt={blog.title || "Blog image"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Title Overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="web-px pb-8 md:pb-12 w-full">
          <div className="max-w-4xl">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.postType === "comic" && (
                <span className="editorial-badge bg-blue-500 text-white">
                  Comic
                </span>
              )}
              {blog.categories?.map((category, index) => (
                <span
                  key={index}
                  className="editorial-badge bg-white/90 text-foreground"
                >
                  {category.title}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Content Area
const BlogContent = ({ blog }: { blog: IPost }) => {
  const isComic = blog.postType === "comic";

  return (
    <section className="web-px py-10 md:py-14">
      <div className="max-w-3xl mx-auto">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 pb-8 border-b mb-8">
          {/* Author */}
          {blog.author && (
            <Link
              href={`/contributers/${blog.author.slug?.current}`}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all">
                <Image
                  src={imageUrl(blog.author.image)}
                  alt={blog.author.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-dm-sans font-semibold text-foreground group-hover:text-primary transition-colors">
                  {blog.author.name}
                </p>
                <p className="font-dm-sans text-xs text-muted-foreground uppercase tracking-wider">
                  Contributor
                </p>
              </div>
            </Link>
          )}

          <div className="h-8 w-px bg-gray-200 hidden sm:block" />

          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-dm-sans text-sm">
              {formatSanityDate(blog.publishedAt)}
            </span>
          </div>

          {/* Post Type Badge */}
          {isComic && (
            <span className="ml-auto editorial-badge bg-blue-100 text-blue-700">
              Comic
            </span>
          )}
        </div>

        {/* Title for comics (no hero image) */}
        {isComic && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.categories?.map((category, index) => (
                <span key={index} className="editorial-badge">
                  {category.title}
                </span>
              ))}
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {blog.title}
            </h1>
          </div>
        )}

        {/* Content */}
        {isComic ? (
          <div className="comic-content space-y-6">
            {blog.comicContent && blog.comicContent.length > 0 ? (
              blog.comicContent.map((panel, index) => (
                <figure key={panel._key || index} className="relative">
                  <div className="relative w-full rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={imageUrl(panel.image)}
                      alt={panel.caption || `Panel ${index + 1}`}
                      width={1200}
                      height={1600}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                  </div>
                  {panel.caption && (
                    <figcaption className="mt-2 text-center font-dm-sans text-sm text-muted-foreground italic">
                      {panel.caption}
                    </figcaption>
                  )}
                </figure>
              ))
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <p className="font-dm-sans text-muted-foreground">
                  No comic panels available
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="prose prose-lg max-w-none font-dm-sans prose-headings:font-playfair prose-headings:font-semibold prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-blockquote:border-l-primary prose-blockquote:font-playfair prose-blockquote:italic">
            <Portable_Text_Editor body={blog.body} />
          </div>
        )}
      </div>
    </section>
  );
};

// Author Card Section
const AuthorCard = ({ blog }: { blog: IPost }) => {
  if (!blog.author) return null;

  return (
    <section className="bg-editorial-ivory">
      <div className="web-px py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Author Image */}
              <div className="flex-shrink-0">
                <Link href={`/contributers/${blog.author.slug?.current}`}>
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-4 ring-primary/10">
                    <Image
                      src={imageUrl(blog.author.image)}
                      alt={blog.author.name || "Author"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <p className="font-dm-sans text-xs font-medium text-primary uppercase tracking-wider mb-1">
                  Written by
                </p>
                <Link href={`/contributers/${blog.author.slug?.current}`}>
                  <h3 className="font-playfair text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                    {blog.author.name}
                  </h3>
                </Link>
                {blog.author.bio && (
                  <p className="font-dm-sans text-muted-foreground mt-3 leading-relaxed">
                    {blog.author.bio}
                  </p>
                )}
                <Link
                  href={`/contributers/${blog.author.slug?.current}`}
                  className="inline-flex items-center gap-2 mt-4 font-dm-sans text-sm font-medium text-primary hover:underline"
                >
                  View all stories
                  <ArrowLeft className="h-3 w-3 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Comments Section
const CommentsSection = ({ blog }: { blog: IPost }) => {
  return (
    <section className="bg-white border-t">
      <div className="web-px py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <CommentsBlogs blogId={blog._id} />
        </div>
      </div>
    </section>
  );
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const data = await fetchBlogBySlug(params.blog as string);
  if (!data) {
    return defaultMetadata();
  }
  return {
    title: data.title,
    description: data.excerpt,
    keywords: "Qwani, young writers, events, writing, literature",
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: [
        {
          url: imageUrl(data.mainImage?.asset || data.mainImage),
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  };
}

export default Page;
