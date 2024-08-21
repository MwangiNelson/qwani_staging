import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProfileCard, ProfileCardWithBookMark } from "./common";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { IPost } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import { formatSanityDate } from "../../utils/functions";
export const BlogCardMain: React.FC<{
  blog: IPost;
  bg?: "background" | "foreground";
}> = ({ bg = "background", blog }) => {
  return (
    <Card
      className={cn(
        `w-full  z-[1]  p-0 bg-transparent border-none  shadow-none relative  `,
        bg === "background" ? "text-foreground " : "text-background"
      )}
    >
      <Link
        href={`
      /blogs/${blog?.slug.current}
      `}
      >
        <div className="top-0 absolute fx gap-1">
          {blog.categories
            ? blog.categories.map((category, index) => (
                <Badge key={index} variant={"outline"}>
                  <span className="text-background">{category.title}</span>
                </Badge>
              ))
            : "No Category"}
        </div>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={imageUrl(blog?.mainImage)}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className=" flex flex-col space-y-1">
            <h4 className="ts6 font-semibold ">{blog?.title}</h4>
            <p className="  ">{blog?.excerpt.slice(0, 100)}...</p>
            <ProfileCard
              date={formatSanityDate(blog?.publishedAt)}
              imageUrl={imageUrl(blog?.author?.image)}
              name={blog?.author?.name}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const BlogListHero = ({ blogs }: { blogs: IPost[] }) => {
  return (
    <div className="w-full fx-col gap-10">
      {blogs.map((blog, index) => (
        <BlogHorizontalCard key={index} blog={blog} />
      ))}
    </div>
  );
};
const BlogHorizontalCard = ({ blog }: { blog: IPost }) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none text-background relative  ">
      <Link
        href={`
      /blogs/${blog?.slug.current}
      `}
      >
        <CardContent className="w-full p-0 fx-col gap-3">
          <div className=" flex flex-col space-y-1">
            <div className="fx gap-1">
              {blog.categories
                ? blog?.categories.map((category, index) => (
                    <Badge key={index} variant={"outline"}>
                      <span className="text-background">{category.title}</span>
                    </Badge>
                  ))
                : "No Category"}
            </div>
            <h4 className="ts6 font-semibold text-background">{blog?.title}</h4>
            <p className=" text-md ">
              {blog?.excerpt.slice(0, 100).concat("...")}
            </p>
            <ProfileCard
              date={formatSanityDate(blog?.publishedAt)}
              imageUrl={imageUrl(blog?.author?.image)}
              name={blog?.author?.name}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export const BlogCardPrimary: React.FC<{
  size?: "small" | "large";
  blog: IPost;
}> = ({ size = "large", blog }) => {
  return (
    <Card
      className={cn(
        "w-full bg-background  z-[1]  h-auto border-none  shadow-none text-foreground relative  "
      )}
    >
      <Link href={`/blogs/${blog?.slug.current}`}>
        <CardContent
          className={cn(
            "w-full fx-col gap-3 py-5 ",
            size == "large" ? "h-[260px]" : ""
          )}
        >
          <div className=" flex flex-col gap-2">
            <div className="fx gap-1">
              {blog.categories
                ? blog?.categories.map((category, index) => (
                    <Badge key={index} variant={"outline"}>
                      <span className="text-foreground">{category.title}</span>
                    </Badge>
                  ))
                : "No Category"}
            </div>

            <h4 className="ts6 font-semibold ">{blog?.title}</h4>
            <p className=" text-md ">
              {size == "large"
                ? blog?.excerpt.slice(0, 70)
                : blog?.excerpt.slice(0, 50)}
            </p>
            <ProfileCard
              date={formatSanityDate(blog?.publishedAt)}
              imageUrl={imageUrl(blog?.author?.image)}
              name={blog?.author?.name}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
