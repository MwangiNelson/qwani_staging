"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { randomImage } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Bookmark } from "lucide-react";
import Link from "next/link";
export const EventCard = (props: { index: number }) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  ">
      <Link href={`/events/1234`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={`/imgs/${props.index + 1}.jpg`}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className="text-background flex flex-col p">
            <h4 className="text-lg">Lets hike at Kariminu!</h4>
            <h5 className="h5 text-primary">Kenya Railways Museum</h5>
            <p className="text-background/60">May 25th 2024, 8:00am</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const EventCardMain = (props: { index: number }) => {
  return (
    <Card className="w-full  z-[1]   ">
      <Link href={`/events/1234`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={`/imgs/${props.index + 1}.jpg`}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className="flex flex-col p-4">
            <h4 className="text-lg">Lets hike at Kariminu!</h4>
            <h5 className="ts6 font-semibold text-primary">
              Kenya Railways Museum
            </h5>
            <p className="">May 25th 2024, 8:00am</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const BlogCard = (props: {
  imageUrl: string;
  title: string;
  date: string;
}) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none  ">
      <Link href={`/blogs/1234`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={props.imageUrl}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className=" flex flex-col p">
            <h4 className="font-thin text-sm">{props.date}</h4>
            <h5 className="h5 text-primary">{props.title}</h5>
            <p className="text-xs font-light ">...Read More</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const TeamMemberCard = () => {
  return (
    <Card className="p-0 relative h-[350px] z-[3]">
      <Image
        src={randomImage()}
        alt="Team Member"
        width={500}
        height={500}
        className="absolute-cover rounded-sm z-[-1]"
      />
      <div className="absolute-cover bg-foreground/50 z-[-1]" />
      <CardContent className=" fx flex-col text-background py-4 h-full">
        <h1 className="h3 ">
          Tole <br /> Rightson
        </h1>
        <div className="fx-jb flex-1  items-end ">
          <div className="fx-center gap-1">
            <Button
              variant={"ghost"}
              className="blur-bg rounded-full"
              size={"icon"}
            >
              <FaXTwitter />
            </Button>
            <Button
              variant={"ghost"}
              className="blur-bg rounded-full"
              size={"icon"}
            >
              <FaInstagram />
            </Button>
          </div>
          <Button
            className="blur-bg rounded-full "
            variant="ghost"
            size={"sm"}
            asChild
          >
            <Link href={`/about/1234`}>
              <span>Excetive Director</span>
              <FaAngleRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const WriterCard = () => {
  return (
    <Card className="p-0 relative h-[350px] z-[3]">
      <Image
        src={randomImage()}
        alt="Team Member"
        width={500}
        height={500}
        className="absolute-cover rounded-sm z-[-1]"
      />
      <div className="absolute top-1/2 -translate-y-1/2 fx-col right-0 ">
        {["Art", "Poerty", "Fiction"].map((item, index) => {
          return (
            <span
              key={index}
              className="font-semibold text-bgsecondary text-end"
            >
              {item}
            </span>
          );
        })}
      </div>
      <div className="absolute-cover bg-foreground/50 z-[-1]" />
      <CardContent className=" fx flex-col text-background py-4 h-full">
        <h1 className="ts5  font-semibold ">
          Tole <br /> Rightson
        </h1>
        <div className="fx-jb flex-1  items-end ">
          <div className="fx-center gap-1">
            <Button
              variant={"ghost"}
              className="blur-bg rounded-full"
              size={"icon"}
            >
              <FaXTwitter />
            </Button>
            <Button
              variant={"ghost"}
              className="blur-bg rounded-full"
              size={"icon"}
            >
              <FaInstagram />
            </Button>
          </div>
          <Button
            className="blur-bg rounded-full "
            variant="ghost"
            size={"sm"}
            asChild
          >
            <Link href={`/writers/1234`}>
              <span>Read More</span>
              <FaAngleRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const PublicationCards = (props: {
  imageUrl: string;
  title: string;
  paragraph: string;
  date: string;
}) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none  ">
      <Link href={`/publications/1234`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={props.imageUrl}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className=" flex flex-col p">
            <h4 className="font-thin text-sm">{props.date}</h4>
            <h5 className="h5 text-primary">{props.title}</h5>
            <p className="text-xs font-light ">{props.paragraph}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const ProfileCard = () => {
  return (
    <div className="fx-a-center gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="fx-col">
        <div className=" font-semibold text-sm">Tole Rightson</div>
        <div className="fx font-light text-sm">20/20/2020 || 3 min read</div>
      </div>
    </div>
  );
};
export const ProfileCardWithBookMark = () => {
  return (
    <div className="fx-jb items-center pt-2 w-full">
      <ProfileCard />
      <Bookmark size={15} />
    </div>
  );
};
