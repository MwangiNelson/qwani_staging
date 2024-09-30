"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SideDrawer } from "./SideDrawer";
import { Button } from "../ui/button";
import { CustomLink, OpenMenuOnHover } from "./utils/Menus";
import { useWebsiteContext } from "./utils/WebsiteContext";
export interface TimeType {
  time: number;
  type: "before" | "after" | "last";
}
const Navbar = () => {
  const pathname = usePathname();
  const { customActiveLink } = useWebsiteContext();

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
            { title: "How It Started", link: "/blogs/how-it-started" },
            { title: "How It Went", link: "/blogs/how-it-went" },
          ]}
        />
        <OpenMenuOnHover
          link="/events"
          title="Events"
          submenu={[
            { title: "Upcoming Events", link: "/events#upcoming" },
            { title: "Past Events", link: "/events#past" },
          ]}
        />
        <OpenMenuOnHover
          link="/writers"
          title="Writers"
          submenu={[
            { title: "Qwani Writers", link: "/writers" },
            { title: "Contributers", link: "/contributers" },
          ]}
        />
        {/* <CustomLink name="Blogs" url="/blogs" /> */}
        <OpenMenuOnHover
          link="/blogs"
          title="Blogs"
          submenu={[
            { title: "Blogs", link: "/blogs" },
            {
              title: "Submit To Qwani",
              link: "/blogs/how-to-publish-with-qwani",
            },
          ]}
        />
        <CustomLink name="Publications" url="/publications" />
        <CustomLink name="Gallery" url="/gallery" />
      </div>
      <Button className="hidden lg:flex" size={"sm"} asChild>
        <Link href="/contact">Contact Us</Link>
      </Button>
      <div className="flex lg:hidden">
        <SideDrawer />
      </div>
    </div>
  );
};

export default Navbar;
