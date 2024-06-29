"use client";
import React from "react";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ISwitch } from "@/utils/uitypes";
import { cn } from "@/lib/utils";
import { SideDrawer } from "./SideDrawer";
export interface TimeType {
  time: number;
  type: "before" | "after" | "last";
}
const Navbar = ({ open, setOpen }: ISwitch) => {
  const pathname = usePathname();
  const CustomLink = ({ name, url }: { name: string; url: string }) => {
    return (
      <button className="group relative flex flex-col text-white" key={name}>
        <Link
          key={name}
          href={url}
          className={cn(
            `text-base
               font-medium t-200  text-background hover:text-darkRed`,
            pathname === url && "text-primary"
          )}
        >
          {name}
        </Link>
        <span
          className={`w-0 
            h-[2px] bg-primary t-200  absolute 
            -bottom-[5px] left-0 group-hover:w-full
            ${pathname === url && "w-full"}
            `}
        ></span>
      </button>
    );
  };

  return (
    <div
      className="h-[80px] bg-black    
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
        <CustomLink name="Contact Us" url="/contact" />
      </div>
      <SideDrawer />
    </div>
  );
};

export default Navbar;
