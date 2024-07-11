import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { randomImage } from "@/lib/data";
import Image from "next/image";
import { FaAngleRight, FaInstagram, FaXTwitter } from "react-icons/fa6";
export const EventCard = (props: { index: number }) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  ">
      <CardContent className="w-full p-0 fx-col gap-3">
        <Image
          src={`/imgs/${props.index + 1}.jpg`}
          className="w-full h-[250px] rounded-sm object-cover "
          alt={"Card Image"}
          width={1000}
          height={1000}
        />
        <div className="text-background flex flex-col p">
          <h4 className="text-lg">Lets hike at Kariminu!</h4>
          <h5 className="h5 text-primary">Kenya Railways Museum</h5>
          <p className="text-background/60">May 25th 2024, 8:00am</p>
        </div>
      </CardContent>
    </Card>
  );
};
export const BlogCard = (props: {
  imageUrl: string;
  title: string;
  date: string;
}) => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  shadow-none  ">
      <CardContent className="w-full p-0 fx-col gap-3">
        <Image
          src={props.imageUrl}
          className="w-full h-[250px] rounded-sm object-cover "
          alt={"Card Image"}
          width={1000}
          height={1000}
        />
        <div className=" flex flex-col p">
          <h4 className="font-thin text-sm">{props.date}</h4>
          <h5 className="h5 text-primary">{props.title}</h5>
          <p className="text-xs font-light ">...Read More</p>
        </div>
      </CardContent>
    </Card>
  );
};
export const TeamMemberCard = () => {
  return (
    <Card className="p-0 relative h-[350px] z-[3]">
      <Image
        src={randomImage()}
        alt="Team Member"
        width={500}
        height={500}
        className="absolute-cover rounded-sm z-[-1]"
      />
      <div className="absolute-cover bg-foreground/50 z-[-1]" />
      <CardContent className=" fx flex-col text-background py-4 h-full">
        <h1 className="h3 ">
          Tole <br /> Rightson
        </h1>
        <div className="fx-jb flex-1  items-end ">
          <div className="fx-center gap-1">
            <Button
              variant={"ghost"}
              className="blur-bg rounded-full"
              size={"icon"}
            >
              <FaXTwitter />
            </Button>
            <Button
              variant={"ghost"}
              className="blur-bg rounded-full"
              size={"icon"}
            >
              <FaInstagram />
            </Button>
          </div>
          <Button className="blur-bg rounded-full " variant="ghost" size={"sm"}>
            <span>Excetive Director</span>
            <FaAngleRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
