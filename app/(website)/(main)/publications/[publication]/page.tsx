import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { MinimalFooter } from "@/components/website/shared/client";
import { BackButton } from "@/components/website/utils";
const Publication = () => {
  return (
    <div className="pb-20">
      <HeroSection />
      <PublicationsImagesSection />
      <EventDetails />
      <MinimalFooter />
    </div>
  );
};
const HeroSection = () => {
  return (
    <div className="bg-foreground web-px h-screen text-background pt-36 md:pt-44">
      <div className="fx-col gap-1">
        <div>
          <BackButton />
        </div>
        <h4 className="ts7  font-bold text-primary">Published April 1, 2024</h4>
        <h3 className="ts3 font-semibold">
          QWANI BOOK 1<span className="ts6 font-thin italic"> By Qwani </span>
        </h3>

        <p className="">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non
          suscipit.
        </p>
        <div className="fx-jb">
          <div className="flex gap-2 mt-2">
            <Badge className="bg-background text-foreground h-[35px]">
              KSH 1,000
            </Badge>
            <Button
              variant={"noEffect"}
              size="sm"
              className="border border-primary text-primary rounded-full"
            >
              Buy Ticket
            </Button>
          </div>
          <Button
            variant={"noEffect"}
            size="sm"
            className="border border-background text-background rounded-full"
          >
            <span>Buy Ticket</span>
            <FaAngleRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
const PublicationsImagesSection = () => {
  return (
    <div className="-mt-[25vh]  web-px">
      <Image
        alt="CONTACT IMAGE"
        src="/book1.png"
        width={1920}
        height={1080}
        className="h-[50vh] md:h-[60vh] object-cover"
      />
    </div>
  );
};
const EventDetails = () => {
  return (
    <div className="web-px mt-5">
      <div className="fx-jb mt-10">
        <div className="fx-col">
          <h3 className="ts5 font-semibold">Genre</h3>
          <p>
            Flash Fiction, Film Reviews, Music Reviews, Poetry, Philosophy,
            Science, Short Stories, Sheng
          </p>
        </div>
        <div className="fx-a-center gap-2">
          <span>Share</span>
          <Button variant={"outline"} size={"icon"}>
            <FaXTwitter />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <FaInstagram />
          </Button>
          <Button variant={"outline"} size={"icon"}>
            <CiShare2 />
          </Button>
        </div>
      </div>
      <div className="ts5 mt-4 font-semibold">Description</div>
      <p className="">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti et
        ad, eligendi atque possimus at odit, sit assumenda vitae quasi molestias
        aliquid impedit vero, doloremque autem velit rem. Exercitationem quae
        eaque cum voluptate non natus ipsam soluta illo sequi, perspiciatis, in
        ut ipsum consequuntur quisquam. Asperiores libero ipsam aliquam rem
        dolores magnam veniam architecto facere quisquam nemo esse suscipit
        commodi reiciendis repudiandae nulla nobis accusantium expedita
        consequuntur in voluptate molestiae iste, neque minus aperiam!
        Architecto optio dolore quos? Sed ea praesentium libero, consequuntur
        minima eos ratione corrupti accusamus voluptates molestiae doloribus
        assumenda perferendis ipsum beatae eaque nam animi quidem maxime.
      </p>
    </div>
  );
};
export default Publication;
