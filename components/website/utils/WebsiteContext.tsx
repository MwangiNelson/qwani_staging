"use client";
import { useContext, createContext, useState } from "react";
interface IWebsiteContext {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const WebsiteContext = createContext<IWebsiteContext | null>(null);
export const WebsiteContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <WebsiteContext.Provider value={{ drawerOpen, setDrawerOpen }}>
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
