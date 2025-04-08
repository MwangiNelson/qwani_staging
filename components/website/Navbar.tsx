"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SideDrawer } from "./SideDrawer";
import { Button } from "../ui/button";
import { CustomLink, OpenMenuOnHover } from "./utils/Menus";
import { useWebsiteContext } from "./utils/WebsiteContext";
import { ILocation } from "@/utils/data_types";
export interface TimeType {
  time: number;
  type: "before" | "after" | "last";
}
const Navbar = ({ locations }: { locations: ILocation[] }) => {
  const searchParams = useSearchParams();

  return (
    <div
      className="h-full  sticky top-0 z-50 
    flex justify-between items-center web-px"
    >
      <Link className="flex items-center" href={"/"}>
        <Image alt="logo" src="/logo-white.png" width={150} height={150} />
      </Link>

      <div className=" hidden lg:flex justify-center items-center gap-5 flex-1 ">
        <CustomLink name="Home" url="/" />
        <OpenMenuOnHover
          link="/about"
          title="About"
          submenu={[
            { title: "About Us", link: "/about" },
            { title: "Our Team", link: "/about#team" },
            { title: "How It Started", link: "/how-it-started" },
            { title: "How It Went", link: "/blogs/how-it-went" },
          ]}
        />
        <OpenMenuOnHover
          link="/events"
          title="Events"
          paramsName="location"
          submenu={locations.map((location) => ({
            title: location.title,
            link: `/events?location=${location.slug.current}#location-events`,
            isActive: location.slug.current === location.slug.current,
          }))}
        />
        <OpenMenuOnHover
          link="/writers"
          title="Writers"
          submenu={[
            { title: "Qwani Writers", link: "/writers" },
            { title: "Contributors", link: "/contributers" },
          ]}
        />
        <CustomLink name="Blogs" url="/blogs" />

        <CustomLink name="Publications" url="/publications" />
        <CustomLink name="Gallery" url="/gallery" />
        <OpenMenuOnHover
          link="/blogs/how-to-publish-with-qwani"
          title="Submit"
          submenu={[
            {
              title: "how to submit to Qwani's blog",
              link: "/blogs/how-to-publish-with-qwani",
            },
            {
              title: "How to publish your book with Qwani",
              link:
                "https://cdn.sanity.io/files/8w56yabk/production/bbed0ebb6e586f333c7e05fdf49f60ffa9079f5b.pdf",
            },
          ]}
        />
      </div>
      <Button className="hidden lg:flex" size={"sm"} asChild>
        <Link href="/contact">Contact Us</Link>
      </Button>
      <div className="flex lg:hidden">
        <SideDrawer locations={locations} />
      </div>
    </div>
  );
};

export default Navbar;
