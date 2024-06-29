import { Button } from "@/components/ui/button";
import {
  CustomVideoPlayer,
  HeroUI,
} from "@/components/website/shared/CommonUi";
import Image from "next/image";
export default function Home() {
  return (
    <main className="  ">
      <HeroUI imageLink="/home.png">
        <div className=" mb:-mt-14  text-background fx-col gap-5 justify-start ">
          <h1 className=" h1 text-center ">
            Discover
            <span className="text-primary"> Qwani</span>: A Hub for Young
            Writers and Exciting <span className="text-primary">Events</span>
          </h1>
          <p className="text-xl text-center">
            Qwani champions the artistry of young writers, curating a rich
            tapestry of narratives that resonate with the soul and spark
            imagination.
          </p>
          <div className="w-full place-content-center fx">
            <Button>Join Community</Button>
          </div>
        </div>
      </HeroUI>
      <AboutSection />
    </main>
  );
}
const AboutSection = () => {
  return (
    <div className="fx-col  gap-8 web-px my-10">
      <div className="fx-col-mb gap-1 md:gap-10">
        <h3 className="h5 text-primary ">About Qwani</h3>
        <p className="text-lg w-full flex-1   ">
          Qwani is a vibrant youth-led initiative, serving as a dynamic platform
          for emerging writers. It celebrates diversity in literature,
          showcasing fresh perspectives across various forms of writing, from
          gripping short stories to evocative poetry.
        </p>
      </div>
      <div className="w-full">
        <Image
          src={"/youth.jpg"}
          alt="Youth"
          width={1000}
          height={1000}
          className="w-full max-h-[500px]  object-cover rounded-lg cursor-pointer"
        />
      </div>
      <div className="fx-col-mb gap-1 md:gap-10">
        <h3 className="h5 text-primary ">Qwani</h3>
        <p className="text-lg font-semibold">Literary Voices Unleashed</p>
        <p className="text-lg w-full flex-1">
          Qwani is a vibrant youth-led initiative, serving as a dynamic platform
          for emerging writers. It celebrates diversity in literature,
          showcasing fresh perspectives across various forms of writing, from
          gripping short stories to evocative poetry.
        </p>
      </div>
    </div>
  );
};
export const AboutCards = () => {
  return <></>;
};
