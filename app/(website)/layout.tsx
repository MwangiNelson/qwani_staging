import { WebsiteClient } from "@/components/website/Client";
import { NProgress } from "@/components/website/NProgress";
import { WebsiteContextProvider } from "@/components/website/utils/WebsiteContext";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <WebsiteContextProvider>
      <WebsiteClient>
        <NProgress />
        {children}
      </WebsiteClient>
    </WebsiteContextProvider>
  );
};

export default Layout;
