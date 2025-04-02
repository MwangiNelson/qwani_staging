import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaInstagram, FaLink, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useWebsiteContext } from "./utils/WebsiteContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ILocation } from "@/utils/data_types";

const SideMenus = ({ locations }: { locations: ILocation[] }) => {
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
      <MobileMenu locations={locations} />
    </div>
  );
};

export default SideMenus;
const MobileMenu = ({ locations }: { locations: ILocation[] }) => {
  return (
    <div className="flex lg:hidden py-10 flex-col h-[95vh] px-8">
      <div className="flex gap-5 flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col gap-5 pt-10 pb-5">
          <CustomLink name="Home" url="/" />
          <DropdownLink
            link="/about"
            title="About"
            submenu={[
              { title: "About Us", link: "/about" },
              //our team
              { title: "Our Team", link: "/about#team" },
              { title: "How It Started", link: "/how-it-started" },
              { title: "How It Went", link: "/blogs/how-it-went" },
            ]}
          />
          {/* <CustomLink name="Events" url="/events" /> */}
          <DropdownLink
            link="/events"
            title="Events"
            submenu={locations.map((location) => ({
              title: location.title,
              link: `/events?location=${location.slug.current}#location-events`,
              isActive: location.slug.current === location.slug.current,
            }))}
          />

          <DropdownLink
            title="Writers"
            link="/writers"
            submenu={[
              { title: "Our Writers", link: "/writers" },
              { title: "Contributors", link: "/contributers" },
            ]}
          />
          <DropdownLink
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
          <CustomLink name="Contact " url="/contact" />
          <DropdownLink
            link="/blogs/how-to-publish-with-qwani"
            title="Submit"
            submenu={[
              {
                title: "Submit to Qwani's blog",
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
      </div>
      <SocialLinks />
    </div>
  );
};
const CustomLink = ({ name, url }: { name: string; url: string }) => {
  const pathname = usePathname();
  const isActive = pathname.split("/")[1] === url.split("/")[1];

  return (
    <button
      className="group text-start relative flex flex-col  text-background"
      key={name}
    >
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
          <Link href="" target="_blank">
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
  paramsName?: string;
  submenu: { title: string; link: string }[];
}) => {
  const { title, link, submenu } = props;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get(props.paramsName || "");

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
          {submenu.map((submenuItem, index) => {
            const isActive =
              pathname.split("/")[1] === submenuItem.link.split("/")[1] ||
              submenuItem.link.split("=")[1]?.split("#")[0] === search;

            return (
              <Link
                key={index}
                href={submenuItem.link}
                className={cn(
                  "py-2 px-4 text-white hover:bg-gray-600",
                  isActive && "underline underline-offset-4"
                )}
              >
                {submenuItem.title}
              </Link>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
