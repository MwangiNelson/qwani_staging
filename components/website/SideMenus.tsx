import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaInstagram, FaLink, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useWebsiteContext } from "./utils/WebsiteContext";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="flex lg:hidden py-20 flex-col h-full px-8  ">
      <div className="flex gap-10 flex-col flex-grow justify-center">
        <div className=" flex flex-col justify-center  gap-5 -mt-20 ">
          <CustomLink name="Home" url="/" />
          <CustomLink name="About" url="/about" />
          <CustomLink name="Events" url="/events" />
          {/* <CustomLink name="Writers" url="/writers" />
           */}
          <DropdownLink
            title="Writers"
            link="/writers"
            submenu={[
              { title: "Our Writers", link: "/writers" },
              { title: "Contributers", link: "/contributers" },
            ]}
          />
          <CustomLink name="Blogs" url="/blogs" />
          <CustomLink name="Publications" url="/publications" />
          <CustomLink name="Gallery" url="/gallery" />
          <CustomLink name="Contact " url="/contact" />
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
    <button className="group relative flex flex-col text-background" key={name}>
      <Link
        key={name}
        href={url}
        className={cn(
          `text-lg
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
        className="w-[100px] "
        width={300}
        height={300}
      />
      <div className="flex -ml-3">
        <Button
          className="text-xl text-background bg-transparent
             rounded-full "
          asChild
        >
          <Link href={"https://x.com/qwanibok"} target="_blank">
            <FaXTwitter />
          </Link>
        </Button>
        <Button
          className="text-xl text-background rounded-full bg-transparent"
          asChild
        >
          <Link href={"https://instagram.com/qwanibok"} target="_blank">
            <FaInstagram />
          </Link>
        </Button>

        <Button className="text-xl text-background rounded-full  bg-transparent">
          <Link href="https://www.linkedin.com/company/qwani/" target="_blank">
            <FaLinkedin />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const DropdownLink = (props: {
  title: string;
  link: string;
  submenu: { title: string; link: string }[];
}) => {
  const { title, link, submenu } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between text-background text-lg font-medium hover:text-darkRed"
      >
        <CustomLink name={title} url={link} />
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex flex-col overflow-hidden"
        >
          {submenu.map((submenuItem, index) => (
            <Link
              key={index}
              href={submenuItem.link}
              className="py-2 px-4 text-white hover:bg-gray-600"
            >
              {submenuItem.title}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};
