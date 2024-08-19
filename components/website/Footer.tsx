import React from "react";
import { Button } from "../ui/button";
import { useWebsiteContext } from "./utils/WebsiteContext";
import VideoPlayer from "./shared/VideoPlayer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { JoinCommunityButton } from "./shared/atoms";

export default function Footer() {
  const { minimalFooter } = useWebsiteContext();
  return (
    <div className="">
      {!minimalFooter && (
        <div className="fx-col-mb mb:gap-2 gap-5 web-px mt-20">
          <h3 className="text-primary mb:font-bold mb:text-xl ">
            Join Community
          </h3>
          <div className="flex-1 fx-col gap-2">
            <p className="font-semibold  text-lg">
              Step into Qwanis vibrant circle of creatives. Here, every voice
              matters, every story thrives, and camaraderie blooms. Become a
              part of our literary mosaic today!
            </p>
            <div>
              <JoinCommunityButton size="sm" />
            </div>
          </div>
        </div>
      )}
      {!minimalFooter && (
        <div className="web-px py-10  ">
          <VideoPlayer />
        </div>
      )}
      <div
        className={cn(
          "bg-foreground py-5 web-px pt-10 border-background/50 border-t-[1px]",
          !minimalFooter &&
            "-mt-[200px] pt-[200px] md:-mt-[250px] md:pt-[270px] min-h-[50vh] "
        )}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 w-full text-background gap-5">
          <Image
            src="/logo.svg"
            alt="Qwani Logo"
            width={500}
            height={500}
            className=" w-32 col-span-2 md:col-span-1 "
          />
          <div className="w-full col-span-3 mb:grid mb:grid-cols-2 flex md:justify-between  ">
            <Links links={footer_quickLinks} title={"Quick Links"} />
            <Links links={footer_links} title={"Links"} />
            <Links links={socials} title={"Socials"} />
          </div>
        </div>
        <div className="text-background mt-10 text-sm">
          <p>
            &copy; 2024 Qwani. All rights reserved. Designed by Qwani. Powered
            by{" "}
            <Link
              className="text-primary"
              target="_blank"
              href="https://rightson.vercel.app"
            >
              Chari Design
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
type LinkType = {
  link: string;
  name: string;
};

type LinkProps = {
  links: LinkType[];
  title: string;
};

const Links: React.FC<LinkProps> = ({ links, title }) => (
  <div className="fx-col mb:mb-5 ">
    <h4 className="text-xl font-semibold">{title}</h4>
    {links.map((link) => (
      <Link key={link.link} href={link.link} className="  md:text-lg">
        {link.name}
      </Link>
    ))}
  </div>
);

const footer_quickLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
];
const footer_links = [
  {
    name: "Events",
    link: "/events",
  },
  // {
  //   name: "Gallery",
  //   link: "/gallery",
  // },
  {
    name: "Publications",
    link: "/publications",
  },
];
const socials = [
  {
    name: "Twitter",
    link: "https://x.com/qwanibok",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/qwanibok",
  },
  {
    name: "Whatsap",
    link: "https://chat.whatsapp.com/BQ3gjPMI6GUHa7qDqFVECF",
  },
];
