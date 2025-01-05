"use client";
import { SetState } from "@/utils/uitypes";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
interface IWebsiteContext {
  drawerOpen: boolean;
  setDrawerOpen: SetState<boolean>;
  minimalFooter: boolean;
  speedDial: boolean;
  setSpeedDial: SetState<boolean>;
  addSpeedDialInvisiblePages: (page: string) => void;
  addMinimalFooterVisiblePages: (page: string) => void;
  customActiveLink: string | null;
  makeCustomActiveLink: (link: string) => void;
  preserveScroll: boolean;
  setPreserveScroll: SetState<boolean>;
}
const WebsiteContext = createContext<IWebsiteContext | null>(null);
export const WebsiteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathName = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [speedDialInvisiblePages, setSpeedDialInvisiblePages] = useState<
    string[]
  >([]);
  const [minimalFooterVisiblePages, setMinimalFooterVisiblePages] = useState<
    string[]
  >(["/writers", "/blogs"]);
  const [minimalFooter, setMinimalFooter] = useState(false);
  const [speedDial, setSpeedDial] = useState(true);
  const [customActiveLink, setCustomActiveLink] = useState<string | null>(null);
  const [preserveScroll, setPreserveScroll] = useState(false);

  useEffect(() => {
    setMinimalFooter(false);
    setDrawerOpen(false);
    setPreserveScroll(false);

    if (speedDialInvisiblePages.includes(pathName)) {
      setSpeedDial(false);
    } else {
      setSpeedDial(true);
    }
    if (minimalFooterVisiblePages.includes(pathName)) {
      setMinimalFooter(true);
    } else {
      setMinimalFooter(false);
    }
    setCustomActiveLink(null);
  }, [pathName]);
  const addSpeedDialInvisiblePages = (page: string) => {
    if (!speedDialInvisiblePages.includes(page)) {
      const pages = speedDialInvisiblePages;
      pages.push(page);
      setSpeedDialInvisiblePages(pages);
    }
  };
  const addMinimalFooterVisiblePages = (page: string) => {
    if (!minimalFooterVisiblePages.includes(page)) {
      const pages = minimalFooterVisiblePages;
      pages.push(page);
      setMinimalFooterVisiblePages(pages);
    }
  };
  const makeCustomActiveLink = (link: string) => {
    setCustomActiveLink(link);
  };
  return (
    <WebsiteContext.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        minimalFooter,
        setSpeedDial,
        addSpeedDialInvisiblePages,
        speedDial,
        addMinimalFooterVisiblePages,
        customActiveLink,
        makeCustomActiveLink,
        preserveScroll,
        setPreserveScroll,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsiteContext = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error(
      "useWebsiteContext must be used within a WebsiteContextProvider"
    );
  }
  return context;
};
