import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Lost from "@/components/website/lost";
import CommentsBlogs from "@/components/website/pageUIs/blogs/comments.blogs";
import VerticalComicViewer from "@/components/website/pageUIs/blogs/vertical-comic-viewer";
import {
  BlogProfileCard,
  ProfileCard,
} from "@/components/website/shared/cards/common";
import { MinimalFooter } from "@/components/website/shared/client";
import Portable_Text_Editor from "@/components/website/shared/portable_text_editor";
import { Sharing } from "@/components/website/shared/sharing";
import { BackButton } from "@/components/website/utils";
import {
  defaultMetadata,
  formatSanityDate,
} from "@/components/website/utils/functions";
import { myPortableTextComponents } from "@/components/website/utils/sanity_components";
import { fetchBlogById, fetchBlogBySlug } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IPost } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import { Metadata, ResolvingMetadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Page = async ({ params, searchParams }: Props) => {
  const blog = await fetchBlogBySlug(params.blog as string);
  if (!blog) {
    return <Lost />;
  }
  return (
    <div className="bg-[#F2F2F2] text-foreground pb-20">
      <Hero />
      <Details blog={blog} />
      <MinimalFooter />
    </div>
  );
};
const Hero = () => {
  return <div className="h-[100px] bg-foreground"></div>;
};
const Details = ({ blog }: { blog: IPost }) => {
  const isComic = blog.postType === "comic";

  return (
    <div className="web-px pt-10 space-y-4">
      <div className="fx flex-col items-start gap-2">
        <Button variant={"noEffect"} className="p-0 -ml-2" asChild>
          <BackButton text="Back to Blogs" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {formatSanityDate(blog.publishedAt)}
          </span>
          {isComic && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              COMIC
            </span>
          )}
        </div>
        {blog.author && (
          <BlogProfileCard
            date={formatSanityDate(blog.publishedAt)}
            imageUrl={imageUrl(blog.author.image)}
            name={blog.author?.name}
            slug={blog.author?.slug}
          />
        )}
      </div>

      <div className="blog mt-5 space-y-4">
        <h3 className="ts3 font-semibold">{blog.title}</h3>
        {!isComic && (
          <Image
            src={imageUrl(blog.mainImage.asset || blog.mainImage)}
            className="rounded-md h-[300px] md:h-[500px] object-cover object-center w-full"
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
        )}
      </div>

      <div className="descriptions mt-10 space-y-3">
        <div className="fx items-start flex-col md:flex-row md:justify-between">
          <div className="gap-1 hidden md:flex">
            {blog.categories
              ? blog.categories.map((category, index) => (
                  <Button
                    variant={"outlineNoEffect"}
                    key={index}
                    className="rounded-full"
                  >
                    {category.title}
                  </Button>
                ))
              : "No Category"}
          </div>
          <div className="flex justify-end">
            <Sharing bg="foreground" />
          </div>
        </div>
        <Separator />

        {/* Conditional Content Rendering */}
        {isComic ? (
          <div className="comic-content">
            {blog.comicContent && blog.comicContent.length > 0 ? (
              <VerticalComicViewer
                panels={blog.comicContent}
                title={blog.title}
              />
            ) : (
              <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                <p className="text-gray-500">No comic panels available</p>
              </div>
            )}
          </div>
        ) : (
          <Portable_Text_Editor body={blog.body} />
        )}
      </div>

      <Separator />
      <CommentsBlogs blogId={blog._id} />
      <Separator />
      <div className="md:max-w-[600px] fx mt-4 flex-col p-4 gap-2 bg-foreground/5">
        <div className="flex flex-col md:flex-row gap-3">
          <Image
            src={imageUrl(blog.author.image)}
            className="rounded-full min-w-[70px] min-h-[70px] object-cover object-center"
            alt={"Card Image"}
            width={70}
            height={70}
          />
          <div className="fx-col">
            <div className="fx items-center gap-2">
              <Link
                href={`/contributers/${blog.author.slug.current}`}
                className="underline font-bold text-lg"
              >
                {blog.author.name}
              </Link>
              <Separator orientation="vertical" className="bg-black/40 h-5" />
              <span className="text-lg">CONTRIBUTOR</span>
            </div>
            <p>{blog.author.bio}</p>
          </div>
        </div>
      </div>
    </div>
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
          url: imageUrl(data.mainImage.asset || data.mainImage),
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
  };
}
export default Page;
