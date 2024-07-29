import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { IconType } from "react-icons/lib";
import Link from "next/link";
export function CustomSpeedDial() {
  const CustomLink = (props: {
    link: string;
    icon: IconType;
    text: string;
  }) => {
    return (
      <Link href={props.link} target="_blank" rel="noopener noreferrer">
        <div className="fx-center gap-1 items-center">
          <props.icon size={20} />
          <span className="font-medium">{props.text}</span>
        </div>
      </Link>
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="fixed bottom-5 right-5 z-[3]">
        <Button className="rounded-full w-[50px] h-[50px]">
          <Mail />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36 bg-foreground/70  shadow-2xl border-none text-background">
        <div className="fx fx-col gap-3">
          <CustomLink
            link="mailto:qwanitrust@gmail.com"
            icon={IoMailOutline}
            text="Email"
          />
          <CustomLink
            link="https://chat.whatsapp.com/BQ3gjPMI6GUHa7qDqFVECF"
            icon={FaWhatsapp}
            text="Whatsapp"
          />
          <CustomLink link="/contact" icon={GoArrowUpRight} text="Contact" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
