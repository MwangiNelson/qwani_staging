"use client";
import React from "react";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ISwitch } from "@/utils/uitypes";
import { cn } from "@/lib/utils";
import { SideDrawer } from "./SideDrawer";
import { Button } from "../ui/button";
export interface TimeType {
  time: number;
  type: "before" | "after" | "last";
}
const Navbar = ({ open, setOpen }: ISwitch) => {
  const pathname = usePathname();
  const CustomLink = ({ name, url }: { name: string; url: string }) => {
    const isActive = pathname.split("/")[1] === url.split("/")[1];

    return (
      <button className="group relative flex flex-col text-white" key={name}>
        <Link
          key={name}
          href={url}
          className={cn(
            `text-base
               font-medium t-200  text-background hover:text-darkRed`,
            isActive && "text-primary"
          )}
        >
          {name}
        </Link>
        <span
          className={`w-0 
            h-[2px] bg-primary t-200  absolute 
            -bottom-[5px] left-0 group-hover:w-full
            ${isActive && "w-full"}
            `}
        ></span>
      </button>
    );
  };

  return (
    <div
      className="h-full  sticky top-0 z-50 
    flex justify-between items-center web-px"
    >
      <Link className="flex items-center" href={"/"}>
        <Image alt="logo" src="/logo.svg" width={100} height={100} />
      </Link>

      <div className=" hidden lg:flex justify-center items-center gap-5 flex-1 ">
        <CustomLink name="Home" url="/" />
        <CustomLink name="About" url="/about" />
        <CustomLink name="Events" url="/events" />
        <CustomLink name="Writers" url="/writers" />
        <CustomLink name="Blogs" url="/blogs" />
        <CustomLink name="Publications" url="/publications" />
        {/* <CustomLink name="Gallery" url="/gallery" /> */}
      </div>
      <div className="flex md:hidden">
        <SideDrawer />
      </div>
      <Button className="hidden md:flex" size={"sm"} asChild>
        <Link href="/contact">Contact Us</Link>
      </Button>
    </div>
  );
};

export default Navbar;
