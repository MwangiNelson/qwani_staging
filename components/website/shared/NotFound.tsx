"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FrownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundUI(props: { title: string; message: string }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          router.push("/");
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-8 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <FrownIcon className="h-16 w-16 text-gray-500 dark:text-gray-400" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          {props.title}
        </h1>
        <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
          {props.message}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Redirecting to homepage in {countdown} seconds...
        </p>
      </div>
      <Button
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        onClick={() => router.push("/")}
      >
        Go Home Now
      </Button>
    </div>
  );
}
