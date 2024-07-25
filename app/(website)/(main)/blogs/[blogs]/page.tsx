import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProfileCardWithBookMark } from "@/components/website/shared/cards/common";
import { MinimalFooter } from "@/components/website/shared/client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Page = () => {
  return (
    <div className="bg-[#F2F2F2] text-foreground pb-20">
      <Hero />
      <Details />
      <MinimalFooter />
    </div>
  );
};
const Hero = () => {
  return <div className="h-[100px] bg-foreground"></div>;
};
const Details = () => {
  return (
    <div className="web-px  pt-10">
      <div className="fx flex-col items-start gap-2">
        <Button variant={"noEffect"} className="p-0 -ml-2" asChild>
          <Link href="/blogs">
            <ChevronLeft />
            <span>Back To Blogs</span>
          </Link>
        </Button>
        <span className="font-semibold">Jan 13, 2024</span>
        <ProfileCardWithBookMark />
      </div>
      <div className="blog mt-10 space-y-3">
        <h3 className="ts3 font-semibold">
          A Worcestershire-Based Design Agency
        </h3>
        <Image
          src={"/imgs/4.jpg"}
          className="rounded-md h-[400px] md:h-[500px] object-cover object-center w-full  "
          alt={"Card Image"}
          width={1000}
          height={1000}
        />
      </div>
      <div className="descriptions mt-10 space-y-3">
        <div className="fx-jb items-center">
          <Button variant={"outlineNoEffect"} className="rounded-full">
            Poetry
          </Button>
          <div className="flex justify-end ">
            <div className="fx-a-center gap-2 py-2">
              <span>Share</span>
              <Button variant={"outlineNoEffect"} size={"icon"}>
                <FaXTwitter />
              </Button>
              <Button variant={"outlineNoEffect"} size={"icon"}>
                <FaInstagram />
              </Button>
              <Button variant={"outlineNoEffect"} size={"icon"}>
                <CiShare2 />
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          dolor nemo ea alias provident quod veniam, enim modi reiciendis ad
          commodi tempora consequatur maxime doloribus assumenda officia nulla?
          Esse voluptate velit autem eius rem eveniet consequatur fugiat id.
          Rerum odio neque placeat veritatis aliquam magnam alias ut ipsam ad,
          aliquid molestias recusandae quam iusto, suscipit maxime qui eos sunt!
          Nemo, quo dignissimos eius, nobis quisquam necessitatibus accusantium
          porro doloremque iste sed dicta esse omnis impedit quasi quibusdam
          nulla consequuntur. Assumenda quas rerum voluptatem dolor magni
          laboriosam maxime cumque, ad voluptatum maiores quaerat! Iure
          accusamus asperiores, vero voluptatibus labore eius, sint quibusdam
          sed animi sit necessitatibus, repudiandae nam exercitationem culpa ex
          at debitis ratione. Molestiae iusto amet fuga laudantium ex doloremque
          sed laboriosam voluptates quisquam vel, accusamus quidem eos libero,
          sunt illo deserunt iste consectetur nobis inventore mollitia soluta
          cupiditate rerum eius. Eos, excepturi officia? Deserunt tempore
          repudiandae similique quam nostrum placeat facilis sint repellendus
          commodi dolor, reiciendis incidunt quaerat laboriosam saepe eveniet.
          Ab, provident praesentium possimus sit sed, tempora accusamus suscipit
          repellat voluptas quae pariatur neque quam at. Tenetur fugit
          voluptatum iure amet nisi, debitis repellat nemo necessitatibus fugiat
          eius est et harum. Tempore, dolore hic, iste, facere similique amet
          culpa voluptatum nesciunt maiores qui exercitationem doloribus sequi
          officiis sapiente aliquam neque voluptatibus ea alias necessitatibus
          consequatur assumenda doloremque. Iusto corrupti dolor eveniet
          reprehenderit pariatur amet neque in, laboriosam iste repellendus
          optio quasi dolores fuga ducimus ipsum earum eius possimus et vitae
          exercitationem dignissimos ipsam ratione non assumenda. Molestiae,
          doloremque.
        </p>
      </div>
    </div>
  );
};
export default Page;
