import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { randomImage } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { IEvent, IPost, ITeamMember, IWriter } from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import { formatSanityDate } from "../../utils/functions";
import { FaTiktok } from "react-icons/fa";
export const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  ">
      <Link href={`/events/${event._id}`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={imageUrl(event.featuredImage)}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className="text-background flex flex-col p">
            <h4 className="text-lg">{event.title}</h4>
            <h5 className="h5 text-primary">{event.location}</h5>
            <p className="text-background/60">
              {//show month in short form (Jan, Feb, Mar)
              new Date(event.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const EventCardMain = ({ event }: { event: IEvent }) => {
  return (
    <Card className="w-full  z-[1]   ">
      <Link href={`/events/${event._id}`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={imageUrl(event.featuredImage.asset)}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={event.title}
            width={1000}
            height={1000}
          />
          <div className="flex flex-col p-4">
            <h4 className="text-lg">{event.title}</h4>
            <h5 className="ts6 font-semibold text-primary">{event.location}</h5>
            <p className="">
              {formatSanityDate(event.date)} ,{event.time}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const BlogCard = (props: IPost) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none  ">
      <Link href={`/blogs/${props._id}`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={imageUrl(props.mainImage)}
            className="w-full h-[250px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className=" flex flex-col p">
            <h4 className="font-thin text-sm">
              {new Date(props.publishedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h4>
            <h5 className="h5 text-primary">{props.title}</h5>
            <p className="text-xs font-light ">...Read More</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
export const TeamMemberCard = ({ member }: { member: ITeamMember }) => {
  return (
    <Card className="p-0 relative h-[350px] z-[3]">
      <Image
        src={imageUrl(member.image)}
        alt={member.name}
        width={500}
        height={500}
        className="absolute-cover rounded-sm z-[-1]"
      />
      <div className="absolute-cover bg-foreground/50 z-[-1]" />
      <CardContent className=" fx flex-col text-background py-4 h-full">
        <h1 className="h3 ">
          {/* Tole <br /> Rightson */}
          {member.name.split(" ").map((name, index) => (
            <span key={index}>
              {name}
              <br />
            </span>
          ))}
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
            <Link
              href={`
            /about/${member._id}
            `}
            >
              <span>{member.role}</span>
              <FaAngleRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const WriterCard = ({ writer }: { writer: IWriter }) => {
  return (
    <Card className="p-0 relative h-[350px] z-[3]">
      <Image
        src={imageUrl(writer.image)}
        alt="Team Member"
        width={500}
        height={500}
        className="absolute-cover rounded-sm z-[-1]"
      />
      <div className="absolute top-1/2 -translate-y-1/2 fx-col right-0 ">
        {writer.specializations.map((item, index) => {
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
          {writer.name.split(" ").map((name, index) => (
            <span key={index}>
              {name}
              <br />
            </span>
          ))}
        </h1>
        <div className="fx-jb flex-1  items-end ">
          <div className="fx-center gap-1">
            {writer.socialLinks.twitter && (
              <Button
                variant={"ghost"}
                className="blur-bg rounded-full"
                size={"icon"}
                asChild
              >
                <a
                  href={writer.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </a>
              </Button>
            )}
            {writer.socialLinks.instagram && (
              <Button
                variant={"ghost"}
                className="blur-bg rounded-full"
                size={"icon"}
                asChild
              >
                <a
                  href={writer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </Button>
            )}
            {writer.socialLinks.tiktok && (
              <Button
                variant={"ghost"}
                className="blur-bg rounded-full"
                size={"icon"}
              >
                <a
                  href={writer.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok />
                </a>
              </Button>
            )}
          </div>
          <Button
            className="blur-bg rounded-full "
            variant="ghost"
            size={"sm"}
            asChild
          >
            <Link href={`/writers/${writer._id}`}>
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
  link: string;
}) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none  ">
      <Link href={props.link}>
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
export const ProfileCard = ({
  name,
  date,
  imageUrl,
}: {
  imageUrl: string;
  name: string;
  date: string;
}) => {
  return (
    <div className="fx-a-center gap-2">
      <Avatar>
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="fx-col">
        <div className=" font-semibold text-sm">{name}</div>
        <div className="fx font-light text-sm">{date}</div>
      </div>
    </div>
  );
};
export const ProfileCardWithBookMark = () => {
  return (
    <div className="fx-jb items-center pt-2 w-full">
      {/* <ProfileCard /> */}
      <Bookmark size={15} />
    </div>
  );
};
