import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
export const EventCard = () => {
  return (
    <Card className="w-full  z-[1]  p-0 bg-transparent border-none  ">
      <CardContent className="w-full p-0 fx-col gap-3">
        <Image
          src={"/youth.jpg"}
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
