"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useMediaQuery } from "react-responsive";

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
