import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ProfileCardWithBookMark } from "./common";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
export const BlogCardMain: React.FC<{
  bg?: "background" | "foreground";
}> = ({ bg = "background" }) => {
  return (
    <Card
      className={cn(
        `w-full  z-[1]  p-0 bg-transparent border-none  shadow-none relative  `,
        bg === "background" ? "text-foreground " : "text-background"
      )}
    >
      <Link href={`/blogs/1`}>
        <Badge className="top-0 absolute" variant={"outline"}>
          <span className={cn("text-background")}>Trending</span>
        </Badge>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={"/imgs/2.jpg"}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className=" flex flex-col space-y-1">
            <h4 className="ts6 font-semibold ">
              The origin of the name shylock
            </h4>
            <p className="  ">
              In modern society or today, the name shylock is used to refer to
              an informal money lender. You may have come across such a person
            </p>
            <ProfileCardWithBookMark />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const BlogListHero = () => {
  return (
    <div className="w-full fx-col gap-10">
      {[1, 2].map((index) => (
        <BlogHorizontalCard key={index} />
      ))}
    </div>
  );
};
const BlogHorizontalCard = () => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none text-background relative  ">
      <Link href={`/blogs/1`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <div className=" flex flex-col space-y-1">
            <div>
              <Badge className="top-0 " variant={"outline"}>
                <span className="text-background">Trending</span>
              </Badge>
            </div>
            <h4 className="ts6 font-semibold text-background">
              The origin of the name shylock
            </h4>
            <p className=" text-md ">
              In modern society or today, the name shylock is used to refer to
              an informal money lender. You may have come across such a person
            </p>
            <ProfileCardWithBookMark />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export const BlogCardPrimary: React.FC<{
  size?: "small" | "large";
}> = ({ size = "large" }) => {
  return (
    <Card className="w-full bg-background  z-[1]   border-none  shadow-none text-foreground relative  ">
      <Link href={`/blogs/1`}>
        <CardContent className="w-full fx-col gap-3 py-5">
          <div className=" flex flex-col gap-1">
            <div>
              <Badge className="top-0 " variant={"outline"}>
                <span className="">Trending</span>
              </Badge>
            </div>
            <h4 className="ts6 font-semibold ">
              The origin of the name shylock
            </h4>
            <p className=" text-md ">
              {size == "large"
                ? `In modern society or today, the name shylock is used to refer to an
            informal money lender. You may have come across such a person`
                : ` In modern society or today, the name shylock is used to refer to an
            informal money lender...`}
            </p>
            <ProfileCardWithBookMark />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
