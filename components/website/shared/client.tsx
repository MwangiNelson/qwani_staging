"use client";

import { usePathname } from "next/navigation";
import { useWebsiteContext } from "../utils/WebsiteContext";
import { useEffect } from "react";

export const MinimalFooter = () => {
  const { addMinimalFooterVisiblePages } = useWebsiteContext();
  const pathname = usePathname();
  useEffect(() => {
    addMinimalFooterVisiblePages(pathname);
  }, [pathname]);
  return <></>;
};
