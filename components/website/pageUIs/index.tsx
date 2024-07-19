"use client";

import { ImagesSlider } from "@/components/ui/aceternity/images-slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

export const AboutPageDetailsCard: React.FC<{
  title: number | string;
  description: string;
  index: number;
}> = ({ title, description, index }) => {
  const md = useMediaQuery({ query: "(min-width:768px)" });
  const pt = `${index * 10}px`;
  return (
    <div
      className={` fx-col mb:items-center `}
      style={{
        marginTop: md ? pt : 0,
      }}
    >
      <div className="fx">
        <h1 className="text-9xl font-bold text-primary">{title}</h1>
        <span>
          <Plus className="text-primary" />
        </span>
      </div>
      <div>
        <Button variant={"outline"} className="rounded-full">
          {description}
        </Button>
      </div>
    </div>
  );
};

export const AboutPageValueCard: React.FC<{
  title: number | string;
  description: string;
  index: number;
}> = ({ title, description, index }) => {
  const md = useMediaQuery({ query: "(min-width:768px)" });
  const pt = `${index * 10}px`;
  return (
    <div
      className={` w-full fx-col mb:items-center  gap-1 md:gap-4  `}
      style={{
        marginTop: md ? pt : 0,
      }}
    >
      <h3 className="h3 text-primary">{title}</h3>
      <div className="fx-col-mb mb:items-center  gap-2">
        <Separator className="w-[50px] mt-2" />
        <p className="mb:text-center"> {description}</p>
      </div>
    </div>
  );
};

export const SeparatorTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="fx-a-center gap-5 ">
      <Separator className="w-20 bg-foreground" />
      <h2 className="ts5 font-semibold">{title}</h2>
    </div>
  );
};

export const QwaniPublicationImages = ({ images }: { images: string[] }) => {
  return (
    <ImagesSlider className="h-[50vh] md:h-[80vh]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center px-4"
      >
        <motion.p className="ts2 font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Qwani Book 2
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Buy Now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
};
