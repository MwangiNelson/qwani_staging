import React from "react";
import { Button } from "../ui/button";
import { useWebsiteContext } from "./utils/WebsiteContext";
import VideoPlayer from "./shared/VideoPlayer";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { minimalFooter } = useWebsiteContext();
  return (
    <div className="pt-10">
      <div className="fx-col-mb gap-5 web-px">
        <h3 className="text-primary ">Join Community</h3>
        <div className="flex-1 fx-col gap-2">
          <p className="font-semibold text-lg">
            Step into Qwanis vibrant circle of creatives. Here, every voice
            matters, every story thrives, and camaraderie blooms. Become a part
            of our literary mosaic today!
          </p>
          <div>
            <Button size={"sm"}>Join Community</Button>
          </div>
        </div>
      </div>
      {!minimalFooter && (
        <div className="web-px py-10  ">
          <VideoPlayer />
        </div>
      )}
      <div
        className={cn(
          "bg-foreground py-5 web-px ",
          !minimalFooter && "-mt-[250px] pt-[270px] min-h-[50vh] "
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
          <div className="w-full md:col-span-3 fx justify-between flex-wrap gap-10">
            <Links links={footer_quickLinks} title={"Quick Links"} />
            <Links links={footer_links} title={"Links"} />
            <Links links={socials} title={"Socials"} />
          </div>
        </div>
        <div className="text-background mt-10 text-sm">
          <p>
            &copy; 2024 Qwani. All rights reserved. Designed by Qwani. Powered
            by{" "}
            <Link className="text-primary" href="https://rightson.vercel.app">
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
  <div className="fx-col">
    <h4 className="text-xl font-semibold">{title}</h4>
    {links.map((link) => (
      <Link key={link.link} href={link.link} className="text-lg">
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
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Publications",
    link: "/publications",
  },
];
const socials = [
  {
    name: "Twitter",
    link: "https://twitter.com",
  },
  {
    name: "Instagram",
    link: "https://instagram.com",
  },
  {
    name: "Whatsap",
    link: "https://whatsapp.com",
  },
];
