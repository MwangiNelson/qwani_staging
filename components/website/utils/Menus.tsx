import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWebsiteContext } from "./WebsiteContext";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const OpenMenuOnHover = (props: {
  title: string;
  link: string;
  submenu: {
    title: string;
    link: string;
  }[];
}) => {
  const { title, link, submenu } = props;
  const pathname = usePathname();
  const { customActiveLink } = useWebsiteContext();
  const isActive =
    pathname.split("/")[1] === link.split("/")[1] ||
    link.split("/")[1] === customActiveLink;

  return (
    <div className="group relative">
      <CustomLink name={title} url={link} dropdown />
      <div className="absolute z-10  bg-foreground/80 left-0 hidden w-[150px] group-hover:block group-hover:flex flex-col">
        {submenu.map((submenuItem, subIndex) => (
          <Link
            key={subIndex}
            href={submenuItem.link}
            className="block py-2 px-4 text-white hover:bg-gray-600"
          >
            {submenuItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const CustomLink = ({
  name,
  url,
  dropdown,
}: {
  name: string;
  url: string;
  dropdown?: boolean;
}) => {
  const pathname = usePathname();
  const { customActiveLink } = useWebsiteContext();
  const isActive =
    pathname.split("/")[1] === url.split("/")[1] ||
    url.split("/")[1] === customActiveLink;

  return (
    <button className="group relative flex flex-col text-white" key={name}>
      <Link
        key={name}
        href={url}
        className={cn(
          `text-base fx items-center gap-1 
               font-medium t-200  text-background hover:text-darkRed`,
          isActive && "text-primary"
        )}
      >
        <span>{name}</span>
        {dropdown && <ChevronDown size={20} />}
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
