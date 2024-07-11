"use client";
import React, { ReactNode } from "react";

import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import Navbar from "@/components/website/Navbar";
import { motion } from "framer-motion";
import SideMenus from "@/components/website/SideMenus";
import { cn } from "@/lib/utils";
import { CustomSpeedDial } from "@/components/website/CustomSpeedDial";
import Footer from "@/components/website/Footer";
const Layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="overflow-x-hidden">
      <div className="h-[100px]">
        <Navbar open={open} setOpen={setOpen} />
      </div>
      <CustomSpeedDial />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
