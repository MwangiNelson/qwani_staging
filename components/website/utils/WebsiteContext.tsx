"use client";
import { SetState } from "@/utils/uitypes";
import { usePathname } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";
interface IWebsiteContext {
  drawerOpen: boolean;
  setDrawerOpen: SetState<boolean>;
  minimalFooter: boolean;
}
const WebsiteContext = createContext<IWebsiteContext | null>(null);
export const WebsiteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathName = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [minimalFooter, setMinimalFooter] = useState(false);
  useEffect(() => {
    setMinimalFooter(false);
  }, [pathName]);

  return (
    <WebsiteContext.Provider
      value={{ drawerOpen, setDrawerOpen, minimalFooter }}
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
