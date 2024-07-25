import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileCardWithBookMark } from "@/components/website/shared/cards/common";
import { MinimalFooter } from "@/components/website/shared/client";
import { BackButton } from "@/components/website/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="bg-foreground min-h-screen text-background">
      <HeroSection />
      <MinimalFooter />
    </div>
  );
};
const HeroSection = () => {
  return (
    <div className="web-px py-32 space-y-2 ">
      <div className="fx flex-col items-start gap-2">
        <BackButton />
        <span className="font-semibold">Jan 13, 2024</span>
        <Badge className="blur-bg ">Executive Director</Badge>
        <h3 className="ts4 font-semibold">Keith Angana</h3>
      </div>

      <Image
        src="/imgs/4.jpg"
        alt="Writer"
        width={1000}
        height={1000}
        className="rounded-md h-[500px] object-cover object-center"
      />
      <div className="flex justify-end pt-10">
        <div className="fx-a-center gap-2 ">
          <span>Share</span>
          <Button variant={"outline"} size={"icon"} className="bg-foreground">
            <FaXTwitter />
          </Button>
          <Button variant={"outline"} size={"icon"} className="bg-foreground">
            <FaInstagram />
          </Button>
          <Button variant={"outline"} size={"icon"} className="bg-foreground">
            <CiShare2 />
          </Button>
        </div>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quaerat
        eius voluptatum exercitationem neque nesciunt quam amet beatae iusto
        omnis recusandae fugiat consequuntur molestiae qui nulla facere illo,
        doloremque minima deserunt ab ullam mollitia cum! Soluta, voluptates
        nam? Asperiores accusantium officia voluptatum dolorem tempora dicta
        rem. Laudantium assumenda sit sunt modi iste sapiente soluta earum
        aperiam beatae quidem, accusantium minima quas enim in, quam, excepturi
        molestiae? Quos, vel hic dignissimos illo saepe doloremque qui porro
        quisquam reprehenderit voluptate! Ad vitae quidem quia velit neque optio
        maiores, eaque a ea nobis explicabo nisi magni ratione earum ipsam omnis
        eos similique rem.
      </p>
    </div>
  );
};
export default Page;
