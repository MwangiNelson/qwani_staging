"use client";

import { usePathname } from "next/navigation";
import { useWebsiteContext } from "../utils/WebsiteContext";
import { useEffect } from "react";
import React from "react";
export const MinimalFooter = () => {
  const { addMinimalFooterVisiblePages } = useWebsiteContext();
  const pathname = usePathname();

  useEffect(() => {
    addMinimalFooterVisiblePages(pathname);
  }, [pathname]);
  return <React.Fragment></React.Fragment>;
};

export const MakeActiveLink = ({ activeLink }: { activeLink: string }) => {
  const { makeCustomActiveLink, customActiveLink } = useWebsiteContext();

  const pathname = usePathname();
  useEffect(() => {
    makeCustomActiveLink(activeLink);
  }, [pathname]);
  return <></>;
};
