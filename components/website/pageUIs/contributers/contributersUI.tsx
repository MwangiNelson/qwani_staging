"use client";
import { Button } from "@/components/ui/button";
import { builder, imageUrl } from "@/sanity/lib/client";
import { IAuthor } from "@/utils/data_types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ContributersUI = ({
  contributers,
}: {
  contributers: IAuthor[];
}) => {
  const sortedByName = contributers.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [writers, setWriters] = React.useState<IAuthor[]>(sortedByName);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = sortedByName.filter((writer) =>
      writer.name.toLowerCase().includes(query.toLowerCase())
    );
    setWriters(filtered);
  };
  return (
    <div className=" pb-10 flex flex-col gap-5">
      <div className="fx">
        <input
          className="w-full px-4 py-2 border-2 border-background bg-transparent  flex-1 rounded-none 
        outline-none "
          placeholder="Search for a writer"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button className="h-[45px] bg-background text-foreground hover:bg-background/90 rounded-none">
          Search
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-xl">Our Contributers</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {writers.map((writer, index) => {
            return (
              <Link
                href={`/contributers/${writer.slug.current}`}
                key={writer._id}
                className="w-full bg-background/5 backdrop-blur-[9px] p-4 rounded-md flex flex-col gap-2"
              >
                <Image
                  src={`https://www.tapback.co/api/avatar/${index}.webp`}
                  alt="Contributors"
                  className="max-h-[400px] object-cover rounded-md w-[40px] h-[40px]"
                  width={1000}
                  height={1000}
                />
                <span className="font-semibold">{writer.name}</span>
                <span className="text-sm text-background/80">
                  {writer?.bio?.slice(0, 100)}...
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
