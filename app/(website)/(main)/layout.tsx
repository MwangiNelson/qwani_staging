"use client";
import React, { ReactNode } from "react";
import Navbar from "@/components/website/Navbar";
import { CustomSpeedDial } from "@/components/website/CustomSpeedDial";
import Footer from "@/components/website/Footer";
import { useWebsiteContext } from "@/components/website/utils/WebsiteContext";
const Layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const { speedDial } = useWebsiteContext();
  return (
    <div className="overflow-x-hidden">
      <div className="h-[100px]">
        <Navbar open={open} setOpen={setOpen} />
      </div>
      {speedDial && <CustomSpeedDial />}
      <div className="-mt-[100px] ">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
