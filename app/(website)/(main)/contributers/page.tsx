import { Button } from "@/components/ui/button";
import {
  MakeActiveLink,
  MinimalFooter,
} from "@/components/website/shared/client";
import { AuthorsWrapper } from "@/components/website/shared/Wrappers";
import { fetchAuthors } from "@/lib/api";
import { IAuthor } from "@/utils/data_types";
import React from "react";

const Contributers = async () => {
  const writers = await fetchAuthors();
  return (
    <div className="bg-[#F2F2F2]">
      <HeroSection />
      <Writers writers={writers} />
      <MinimalFooter />
      <MakeActiveLink activeLink="writers" />
    </div>
  );
};
const HeroSection = () => {
  return (
    <div className="bg-foreground web-px text-background space-y-2 min-h-[85vh] pt-40">
      <h3 className="ts2 font-semibold">TO ALL OUR ESTEEMED CONTRIBUTORS</h3>
      <p className="p">
        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
        mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
        tellus..
      </p>
      <Button variant={"outlineNoEffect"}>Write With Qwani</Button>
    </div>
  );
};
const Writers = ({ writers }: { writers: IAuthor[] }) => {
  return (
    <div className=" w-full min-h-screen web-px">
      <AuthorsWrapper authors={writers} />
    </div>
  );
};
export default Contributers;
