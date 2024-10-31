"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export const JoinCommunityButton = ({
  size,
  link,
  text,
}: {
  size: "sm" | "default";
  link?: string;
  text?: string;
}) => {
  return (
    <Button size={size} asChild>
      <Link
        href={link ?? "/events"}
        //target blank when link exists
        target={"_blank"}
      >
        {text ?? "View Our Events"}
      </Link>
    </Button>
  );
};
