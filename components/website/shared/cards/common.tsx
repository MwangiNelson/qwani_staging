"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { randomImage } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaBehance, FaTiktok } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  IAuthor,
  IEvent,
  IPost,
  ISlugSanity,
  ITeamMember,
  IWriter,
} from "@/utils/data_types";
import { imageUrl } from "@/sanity/lib/client";
import { formatSanityDate } from "../../utils/functions";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
export const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  ">
      <Link href={`/events/${event.slug.current}`}>
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
      <Link href={`/events/${event.slug.current}`}>
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
      <Link href={`/blogs/${props.slug.current}`}>
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
  const [hovered, setHovered] = useState(false);
  const memberUrl = `/about/${member.slug?.current}`;

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-sm"
      style={{ aspectRatio: "3/4" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Photo */}
      <Link href={memberUrl} className="block w-full h-full">
        <Image
          src={imageUrl(member.image)}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
        />

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <motion.div
            animate={{ y: hovered ? -52 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-dm-sans text-white/60 text-xs uppercase tracking-[0.18em] mb-1">
              {member.role}
            </p>
            <h3 className="font-playfair text-white text-xl font-semibold leading-tight">
              {member.name}
            </h3>
          </motion.div>

          {/* Social icons — slide up from bottom on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="flex items-center gap-2 mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {member.socialLinks?.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-200 text-xs"
                  >
                    <FaXTwitter />
                  </a>
                )}
                {member.socialLinks?.instagram && (
                  <a
                    href={member.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-200 text-xs"
                  >
                    <FaInstagram />
                  </a>
                )}
                {member.socialLinks?.tiktok && (
                  <a
                    href={member.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-200 text-xs"
                  >
                    <FaTiktok />
                  </a>
                )}
                {member.socialLinks?.linkedIn && (
                  <a
                    href={member.socialLinks.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-200 text-xs"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
                {member.socialLinks?.behance && (
                  <a
                    href={member.socialLinks.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all duration-200 text-xs"
                  >
                    <FaBehance />
                  </a>
                )}

                {/* View profile arrow */}
                <div className="ml-auto flex items-center gap-1 text-primary text-xs font-dm-sans font-medium">
                  <span>View</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
    </motion.div>
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
          {writer.socialLinks && (
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
          )}
          <Button
            className="blur-bg rounded-full "
            variant="ghost"
            size={"sm"}
            asChild
          >
            <Link href={`/writers/${writer.slug.current}`}>
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
  slug,
}: {
  imageUrl: string;
  name: string;
  date: string;
  slug: ISlugSanity;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        router.push(`/contributers/${slug.current}`);
      }}
      className="fx-a-center gap-2 cursor-pointer"
    >
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
export const BlogProfileCard = ({
  name,
  date,
  imageUrl,
  slug,
}: {
  imageUrl: string;
  name: string;
  date: string;
  slug: ISlugSanity;
}) => {
  return (
    <Link
      href={`/contributers/${slug?.current}`}
      className="fx-a-center gap-2 cursor-pointer"
    >
      <Avatar>
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="fx-col">
        <div className=" font-semibold text-sm">{name}</div>
        <div className="fx font-light text-sm">{date}</div>
      </div>
    </Link>
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

export const AuthorCard = ({ author }: { author: IAuthor }) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none  ">
      <Link href={`/contributers/${author.slug.current}`}>
        <CardContent className="w-full p-0 fx-col gap-3">
          <Image
            src={imageUrl(author.image)}
            className="w-full h-[300px] rounded-sm object-cover "
            alt={"Card Image"}
            width={1000}
            height={1000}
          />
          <div className=" flex flex-col p">
            <h5 className="ts5 font-semibold text-primary">{author.name}</h5>
            <p className="font-light ">{author?.bio?.slice(0, 100)}...</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
