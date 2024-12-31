import React, { ReactNode } from "react";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import { SpeedDialViewer } from "@/components/website/utils/speed_dial_viewer";
import { fetchLocations } from "@/lib/api";
const Layout = async ({ children }: { children: ReactNode }) => {
  const locations = await fetchLocations();
  return (
    <div className="overflow-x-hidden">
      <div className="h-[100px]">
        <Navbar locations={locations} />
      </div>
      <SpeedDialViewer />
      <div className="-mt-[100px] ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
