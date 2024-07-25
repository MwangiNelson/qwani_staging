"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"noEffect"}
      className="p-0 -ml-2"
      onClick={() => router.back()}
    >
      <ChevronLeft />
      <span>Back </span>
    </Button>
  );
};
