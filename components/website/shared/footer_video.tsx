"use client";
import { useState } from "react";
import Image from "next/image";
// import { Play } from "../utils/Play";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa6";
export default function FooterVideo() {
  const [play, setPlay] = useState(false);

  return (
    <div className="relative overflow-hidden ">
      {!play && (
        <div>
          <Image
            src={"/thumbnail.jpg"}
            className="w-full h-[350px] md:h-[500px] object-cover object-center"
            width={1000}
            height={1000}
            alt="Pens"
          />
          <div
            className="absolute fx items-center transition duration-100 justify-center hover:bg-foreground/40 top-1/2 w-[100px] h-[100px] right-1/2 translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
            onClick={() => setPlay(true)}
          >
            <FaPlay className="text-background text-3xl" />
          </div>
        </div>
      )}
      {play && (
        <div className="w-full h-[350px] md:h-[500px]">
          <ReactPlayer
            url="https://youtube.com/shorts/7PFdYDeAAd8?si=pRM4qfCL13hfR0B9"
            width="100%"
            height="100%"
            playing={true}
            controls={true}
          />
        </div>
      )}
    </div>
  );
}
