import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useWebsiteContext } from "./utils/WebsiteContext";

const SideMenus = () => {
  const { drawerOpen: open, setDrawerOpen: setOpen } = useWebsiteContext();
  return (
    <div className="h-screen relative bg-primary w-full">
      <motion.div
        animate={{
          scale: open ? 1 : 0,
        }}
        className="absolute z-20 top-5 right-5"
      >
        <Button
          size={"icon"}
          variant={"noEffect"}
          className="  bg-background text-primary 
            rounded-full p-2 text-xl "
          onClick={() => setOpen(false)}
        >
          <IoMdClose className="opacity-70" />
        </Button>
      </motion.div>
      <MobileMenu />
    </div>
  );
};

export default SideMenus;
const MobileMenu = () => {
  return (
    <div className="flex lg:hidden py-20 flex-col h-full  ">
      <div className="flex gap-10 flex-col flex-grow ">
        <div className=" flex flex-col justify-center items-center gap-5  ">
          <CustomLink name="Home" url="/" />
          <CustomLink name="About" url="/about" />
          <CustomLink name="Events" url="/events" />
          <CustomLink name="Writers" url="/writers" />
          <CustomLink name="Blogs" url="/blogs" />
          <CustomLink name="Publications" url="/publications" />
          <CustomLink name="Contact Us" url="/contact" />
        </div>
      </div>
      <SocialLinks />
    </div>
  );
};
const CustomLink = ({ name, url }: { name: string; url: string }) => {
  const pathname = usePathname();
  const isActive = pathname.split("/")[1] === url.split("/")[1];

  return (
    <button className="group relative flex flex-col text-white" key={name}>
      <Link
        key={name}
        href={url}
        className={cn(
          `text-base 
               font-medium t-200  text-background hover:text-darkRed`,
          isActive && "underline underline-offset-4"
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

const SocialLinks = () => {
  return (
    <div className="flex flex-col gap-1 justify-self-end ">
      <Image
        alt="logo"
        src="/logo_white.svg"
        className="w-[100px] mx-3"
        width={300}
        height={300}
      />
      <div className="flex">
        <Button
          className="text-xl text-white bg-transparent
             rounded-full "
        >
          <FaXTwitter />
        </Button>
        <Button className="text-xl text-white rounded-full bg-transparent">
          <FaGithub />
        </Button>

        <Button className="text-xl text-white rounded-full  bg-transparent">
          <FaWhatsapp />
        </Button>
      </div>
    </div>
  );
};
