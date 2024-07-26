"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const BackButton = ({ text }: { text?: string }) => {
  const router = useRouter();
  return (
    <Button
      variant={"noEffect"}
      className="p-0 -ml-2"
      onClick={() => router.back()}
    >
      <ChevronLeft />
      <span>{text || "Back"} </span>
    </Button>
  );
};
