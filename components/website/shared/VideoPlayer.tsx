"use client";
import { useEffect, useRef, useState } from "react";
import VideoPlayerControls from "../utils/VideoPlayerControls";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
export default function VideoPlayer() {
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };
  return (
    <div className="relative overflow-hidden ">
      {isPlaying ? (
        <div
          className="relative  overflow-hidden"
          style={{
            height: isMobile ? "350px" : "500px",
          }}
        >
          <div className="absolute top-4 right-5 z-10">
            <VideoPlayerControls
              progress={videoProgress}
              isPaused={isPaused}
              onPlayPause={togglePlayPause}
            />
          </div>
          <video
            className="w-full h-full object-cover"
            ref={videoRef}
            loop
            muted
          >
            <source src="/video.mp4" />
          </video>
        </div>
      ) : (
        <div>
          <Image
            src={"/footer_image.png"}
            className="w-full h-[350px] md:h-[500px]  object-cover object-center  "
            width={1000}
            height={1000}
            alt="Pens"
          />
          <div
            className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-10"
            onClick={() => {
              setIsPlaying(true);
            }}
          >
            <VideoPlayerControls
              progress={videoProgress}
              isPaused={isPaused}
              onPlayPause={togglePlayPause}
            />
          </div>
        </div>
      )}
    </div>
  );
}
