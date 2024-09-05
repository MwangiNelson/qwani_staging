"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export const JoinCommunityButton = ({ size }: { size: "sm" | "default" }) => {
  const link = "https://chat.whatsapp.com/BQ3gjPMI6GUHa7qDqFVECF";
  const copyToClipboard = () => {
    toast.promise(
      async () => {
        navigator.clipboard.writeText(link);
      },
      {
        loading: "Loading...",
        success: (data) => {
          return `Link copied to clipboard`;
        },
        error: "Error",
      }
    );
  };

  return (
    <Button size={size}>
      <Link href={"/events"}>View Our Events</Link>
    </Button>
  );
};
