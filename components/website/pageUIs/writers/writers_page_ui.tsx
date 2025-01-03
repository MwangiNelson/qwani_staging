"use client";
import { Button } from "@/components/ui/button";
import { builder, imageUrl } from "@/sanity/lib/client";
import { IAuthor, IWriter } from "@/utils/data_types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { convert } from "html-to-text";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaDribbble,
  FaBehance,
  FaMedium,
} from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";

import { FaTiktok } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { portable_text_to_html } from "../../shared/portable_text_editor";
interface Props {
  writers: IWriter[];
}

export const WriterPageUI = ({ writers: writers_raw }: Props) => {
  const sortedByName = writers_raw.sort((a, b) => a.name.localeCompare(b.name));
  const [writers, setWriters] = React.useState<IWriter[]>(sortedByName);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = sortedByName.filter((writer) =>
      writer.name.toLowerCase().includes(query.toLowerCase())
    );
    setWriters(filtered);
  };
  type SocialLink = {
    platform:
      | "twitter"
      | "instagram"
      | "tiktok"
      | "linkedin"
      | "spotify"
      | "dribbble"
      | "behance"
      | "medium"
      | "website";
    url: string;
    icon: IconType;
  };
  const SocialButton = ({ url, icon }: SocialLink) => {
    const Icon = icon;
    return (
      <button>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {Icon && <Icon className=" text-base text-foreground/80" />}
        </a>
      </button>
    );
  };
  return (
    <div className=" pb-10 flex flex-col gap-5">
      <div className="fx">
        <input
          className="w-full px-4 py-2 border-2 border-foreground bg-transparent  flex-1 rounded-none 
        outline-none "
          placeholder="Search for a writer"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button className="h-[45px] bg-foreground text-background hover:bg-background/90 rounded-none">
          Search
        </Button>
      </div>
      <div className="flex flex-col gap-3 text-foreground">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {writers.map((writer, index) => {
            return (
              <div
                key={writer._id}
                className="w-full  shadow-sm backdrop-blur-[9px] py-5 px-4 rounded-lg flex flex-col gap-2"
              >
                <div className="fx justify-between">
                  <Image
                    src={`https://www.tapback.co/api/avatar/${index}.webp`}
                    alt="Contributors"
                    className="max-h-[400px] object-cover rounded-md w-[40px] h-[40px]"
                    width={1000}
                    height={1000}
                  />
                  <Link
                    href={`/contributers/${writer.slug.current}`}
                    className="h-8 w-8 fx items-center justify-center rounded-full shadow-md "
                  >
                    <ChevronRight />
                  </Link>
                </div>

                <span className="font-semibold text-lg">{writer.name}</span>
                <div className="fx items-start justify-start gap-2">
                  {writer.socialLinks && (
                    <div className="fx-center gap-1">
                      {Object.entries(writer.socialLinks).map(
                        ([platform, url]) => {
                          if (!url) return null;

                          const icons = {
                            twitter: FaXTwitter,
                            instagram: FaInstagram,
                            tiktok: FaTiktok,
                            linkedin: FaLinkedin,
                            spotify: FaSpotify,
                            dribbble: FaDribbble,
                            behance: FaBehance,
                            medium: FaMedium,
                            website: CiGlobe,
                          };

                          return (
                            <SocialButton
                              platform={platform as any}
                              key={platform}
                              url={url}
                              icon={icons[platform as keyof typeof icons]}
                            />
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                  {writer.specializations.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className=" text-sm text-foreground/80 font-semibold text-end"
                      >
                        {item}
                        {index < writer.specializations.length - 1 && (
                          <span className="mx-1">•</span>
                        )}
                      </span>
                    );
                  })}
                </div>
                <span className="text-sm text-foreground/80">
                  {convert(
                    portable_text_to_html(writer?.description || "")
                  )?.slice(0, 100)}
                  ...
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
