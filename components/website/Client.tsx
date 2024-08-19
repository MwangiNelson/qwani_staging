"use client";
import { Toaster } from "sonner";

export const WebsiteClient = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
