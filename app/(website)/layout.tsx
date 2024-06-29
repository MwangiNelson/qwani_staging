import { WebsiteContextProvider } from "@/components/website/utils/WebsiteContext";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <WebsiteContextProvider>{children}</WebsiteContextProvider>;
};

export default Layout;
