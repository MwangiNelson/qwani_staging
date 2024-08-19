import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa6";
import { ReactNode } from "react";
export const HeroUI = ({
  imageLink,
  children,
  bgtype = "default",
}: {
  imageLink: string;
  children: React.ReactNode;
  bgtype?: "default" | "radial" | "center";
}) => {
  return (
    <div
      style={{
        background:
          bgtype == "default"
            ? `linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.70) 100%)`
            : bgtype == "radial"
            ? ` linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, 
        rgba(0, 0, 0, 0.01) 21%, rgba(0, 0, 0, 0.00) 100%),
         linear-gradient(90deg, #000 0.07%, rgba(0, 0, 0, 0.00) 99.93%)`
            : `radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.90) 50.82%)`,
      }}
      className=" web-px h-screen bg-primary fx items-center relative  "
    >
      <Image
        src={imageLink}
        alt="hero"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      />
      {children}
    </div>
  );
};

export function CustomVideoPlayer({
  imageLink,
  videoLink,
}: {
  imageLink: string;
  videoLink: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="relative">
        <div>
          <Button
            className="absolute  top-1/2 left-1/2 text-background hover:bg-transparent hover:text-accent "
            variant={"ghost"}
          >
            <FaPlay />
          </Button>
          <Image
            src={imageLink}
            alt="Youth"
            width={1000}
            height={1000}
            className="w-full max-h-[700px]  object-cover rounded-lg cursor-pointer"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="border-non fx-col gap-10">
        <DialogHeader>
          <DialogTitle>About Qwani</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export const PrimaryTextSpan: React.FC<{ children: ReactNode }> = ({
  children,
}) => <span className="text-primary mx-[4px]">{children}</span>;
