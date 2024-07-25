import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { CiShare2 } from "react-icons/ci";
import { MinimalFooter } from "@/components/website/shared/client";
import { EventsCardsWrapper } from "@/components/website/shared/Wrappers";
import { BackButton } from "@/components/website/utils";

const Event = () => {
  return (
    <div>
      <HeroSection />
      <PublicationsImagesSection />
      <EventDetails />
      <MinimalFooter />
      <OtherEvents />
    </div>
  );
};
const HeroSection = () => {
  return (
    <div className="bg-foreground web-px h-screen text-background pt-36 md:pt-44">
      <div className="fx-a-center gap-5 ">
        <div
          className="h-[100px] w-[10px] hidden md:flex"
          style={{
            background: `linear-gradient(180deg, #FA0000 0%, #407B73 100%)`,
          }}
        />
        <div className="fx-col gap-1">
          <div>
            <Button variant={"noEffect"} className="p-0">
              <ChevronLeft />
              <span>Back To Events</span>
            </Button>
          </div>
          <h4 className="ts7  font-bold text-primary">May 25th 2024, 8:00am</h4>
          <h3 className="ts3 font-semibold">Qwani X Uzima Sketch Tour</h3>

          <p className="">
            This time, our tour will be at the Kenya Railways Museum as a
            continuation of our previous tour around the area. We will learn the
            History of the Uganda Railway/Lunat
          </p>
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
        </div>
      </div>
    </div>
  );
};
const PublicationsImagesSection = () => {
  return (
    <div className="-mt-[30vh]  web-px">
      <Image
        alt="CONTACT IMAGE"
        src="/event.jpg"
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
      <div className="fx-jb fx-col-mb">
        <div className="fx-col">
          <h3 className="ts5 font-semibold">Location</h3>
          <p>Nairobi Nairobi, Nairobi County</p>
          <div>
            <BackButton />
          </div>
        </div>
        <div className="fx-a-center gap-2 py-2">
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
      <div className="ts5 font-semibold">Description</div>
      <p>
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

const OtherEvents = () => {
  return (
    <div className="bg-[#F2F2F2] mt-10 py-10 web-px space-y-5">
      <h1 className="ts5 font-semibold ">Other Events</h1>
      <EventsCardsWrapper page="events" />
    </div>
  );
};
export default Event;
