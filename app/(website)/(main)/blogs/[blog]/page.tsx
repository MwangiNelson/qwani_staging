import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProfileCard } from "@/components/website/shared/cards/common";
import { MinimalFooter } from "@/components/website/shared/client";
import { Sharing } from "@/components/website/shared/sharing";
import { BackButton } from "@/components/website/utils";
import { formatSanityDate } from "@/components/website/utils/functions";
import { myPortableTextComponents } from "@/components/website/utils/sanity_components";
import { fetchBlogById } from "@/lib/api";
import { imageUrl } from "@/sanity/lib/client";
import { IPost } from "@/utils/data_types";
import { Props } from "@/utils/uitypes";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
const Page = async ({ params, searchParams }: Props) => {
  const blog = await fetchBlogById(params.blog as string);
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
  return (
    <div className="web-px  pt-10">
      <div className="fx flex-col items-start gap-2">
        <Button variant={"noEffect"} className="p-0 -ml-2" asChild>
          <BackButton text="Back to Blogs" />
        </Button>
        <span className="font-semibold">
          {formatSanityDate(blog.publishedAt)}
        </span>
        <ProfileCard
          date={formatSanityDate(blog.publishedAt)}
          imageUrl={imageUrl(blog.author.image)}
          name={blog.author.name}
        />
      </div>
      <div className="blog mt-5 space-y-4">
        <h3 className="ts3 font-semibold">{blog.title}</h3>
        <Image
          src={imageUrl(blog.mainImage.asset || blog.mainImage)}
          className="rounded-md h-[400px] md:h-[500px] object-cover object-center w-full  "
          alt={"Card Image"}
          width={1000}
          height={1000}
        />
      </div>
      <div className="descriptions mt-10 space-y-3">
        <div className="fx-jb items-center">
          <div className="fx gap-1">
            {blog.categories.map((category, index) => (
              <Button
                variant={"outlineNoEffect"}
                key={index}
                className="rounded-full"
              >
                {category.title}
              </Button>
            ))}
          </div>
          <div className="flex justify-end ">
            <Sharing bg="foreground" />
          </div>
        </div>
        <Separator />
        <div className="prose">
          <PortableText
            value={blog.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;
