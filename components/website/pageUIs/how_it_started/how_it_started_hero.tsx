"use client";
import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useIntersectionInCarousel } from "@/lib/hook/useIntersection";
import { cn } from "@/lib/utils";

type Props = {};

export const How_It_Started_Hero = (props: Props) => {
  return (
    <div
      className="bg-foreground min-h-screen
     flex flex-col items-center pt-36"
    >
      <div className="max-w-md flex flex-col items-center gap-1">
        <h1 className="text-2xl text-background font-bold">
          HOW QWANIS JOURNEY STATED
        </h1>
        <span className="italic text-background font-thin">by JOHN DOE</span>
      </div>
    </div>
  );
};
export const HowItStartedImage = () => {
  const tabs = ["/temp/dream.png", "/temp/crop.png"];
  return (
    <div className="-mt-[360px] p-4 team-member-px ">
      <Carousel className="text-background">
        <CarouselContent>
          {tabs.map((item, index) => {
            return (
              <HeroEvent key={index} tab={item} tabs={tabs} index={index} />
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
const HeroEvent = ({
  tab,
  index: _index,
  tabs,
}: {
  tab: string;
  index: number;
  tabs: string[];
}) => {
  const { activeIndex, itemRefs } = useIntersectionInCarousel();
  const [activeI, setActiveI] = React.useState(0);
  const x = useCarousel();
  useEffect(() => {
    setActiveI(activeIndex);
  }, [x]);

  return (
    <CarouselItem
      className="relative"
      ref={(el) => {
        itemRefs.current[_index] = el;
      }}
      data-index={_index}
    >
      <div className="flex gap-1 absolute left-0 z-[0] w-full">
        {tabs.map((item, index) => (
          <div
            className={cn(
              "w-full h-[5px] ",
              activeI === index ? "bg-background" : "bg-background/40"
            )}
            key={index}
          />
        ))}
      </div>
      <Image
        src={tab}
        alt="hero"
        width={2000}
        height={2000}
        objectFit="cover"
        className="w-full object-cover h-[80vh]"
      />
    </CarouselItem>
  );
};

export const HowItStartedMain = () => {
  return (
    <div>
      <ContentSection />
    </div>
  );
};
export const ContentSection = () => {
  return (
    <div className="w-full team-member-px py-5 space-y-5">
      <h1 className="py-1 text-xl font-semibold">How Qwani Started</h1>
      <p>
        {`The month is August 2022. Kenya has gone on recess to pave way for the General Elections. Everyone is hooked to the screens to follow the tallying. Everyone, of course, except the Gen-Z. We all know the rumor that has always been peddled that the Gen-Z are quite apathetic, and don’t really give a shit about politics. I mean, 8 million of them decided to spend the Tuesday of August 9th as their holiday, didn’t they? Well, whether or not that was true, is neither here nor there. For the purposes of ‘agenda’, let’s give it the benefit of doubt.
As election results are being keyed in at the Bomas of Kenya, two kids, Boy A and Girl A, are learning how to play the keys at Boy B’s mansion at Garden Estate (some nouveau-riche estate along Thika Road). On this particular day, Girl A decides to take out her phone after the class, and shows Boy A the blog she’s been writing. The blog contains random musings which Girl A writes whenever she gets spasms of wisdom. To Boy A, she says that she would love to push her writing to the next level, but she is not confident that this is possible because of how unconventional her writing is.`}
      </p>
      <p>
        {`
Boy A takes her phone, goes to the search engine and types ‘Smitta Smitten articles’ then hands the phone back to Girl A to check them out. She stares at the screen for a while, clearly in confusion. “How does he publish Sheng articles in the Standard newspaper? I thought newspapers only publish formal stuff?” she asks. “Well, if he’s managed to do that, what makes you think your unconventional stuff doesn’t stand a chance?” Boy A responds.
That night, as Boy A scrolls through Twitter (nobody calls it X), he comes across a viral tweet that contains a link to a WordPress blog. Curious about why everyone is interested in the blog, he just clicks the link (we thank God that it was neither a porn link nor a hacker, for we wouldn’t be here anyway). The blog in context is titled ‘The one with Nairobi’s seven deadly sins’ written by Girl B.
`}
      </p>
      <p>
        {`
He reads through the blog and is quite mesmerized. He hadn’t read work so good before. As he scrolls past the article and into the comments, he comes across more WordPress profiles, and as he clicks on each one of them, he discovers the profundity of their blog-posts. The boy can’t believe how it may be possible that there are such great young writers in Kenya. How hadn’t he discovered them before? And how is it that they aren’t popular if, evidently, they are so good at their craft? He makes it his quest to help them achieve that.
The next day, Boy A heads to the supermarket to purchase soap. The thing about purchasing a solitary product such as a bar of soap, is that they just wrap it in a newspaper and hand it over to you. Ordinarily, the boy would tear open the newspaper and take the bar of soap, but on this particular day, he decides to unwrap it carefully. The newspaper, dated 11th April 2021, carried an article titled – ‘The Rise and Fall of Kwani? – An insider’s story’.
Boy A reads through the story slowly and carefully, completely oblivious of the urgent chores that had guided him to purchase the bar of soap. The article lights up a bulb in his mind. For those who may be too young to be familiar with Kwani?, this was a literary magazine started in 2002 by the likes of Binyavanga Wainaina, Yvonne Adhiambo Owuor, Ali Zaidi, Tony Mochama etc in order to ‘foster Kenya's and Africa's intellectual, creative, and imaginative resources through strategic literary initiatives’`}
      </p>
    </div>
  );
};
