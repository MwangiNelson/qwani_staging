import { Button } from "@/components/ui/button";
import { ContributersUI } from "@/components/website/pageUIs/contributers/contributersUI";
import { MinimalFooter } from "@/components/website/shared/client";
import { fetchAuthors, fetchContributersPage } from "@/lib/api";
import Image from "next/image";
import React from "react";

const CollaboratorsNew = async () => {
  const writers = await fetchAuthors();
  const page_content = await fetchContributersPage();
  return (
    <div className="bg-foreground text-background web-px">
      <MinimalFooter />
      <div className="flex gap-5 flex-col justify-center items-center py-40 w-full ">
        <Button className="inline-flex justify-center items-center w-min px-5 py-4 gap-2.5 rounded-full hover:bg-black border-2 border-white/20 bg-white/10 backdrop-blur-lg">
          Can you write? Get started
        </Button>
        <p className="text-4xl font-semibold">
          TO ALL OUR ESTEEMED CONTRIBUTORS
        </p>
        <span className="font-thin">Welcome to our Contributors page!</span>
        <div className="w-full fx justify-center items-center">
          <Image
            src="/writer.jpg"
            alt="Contributors"
            width={1000}
            height={1000}
            className="max-h-[400px] object-cover rounded-md"
          />
        </div>
      </div>
      <ContributersUI contributers={writers} />
    </div>
  );
};

export default CollaboratorsNew;
