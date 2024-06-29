"use client";
import React, { ReactNode } from "react";

import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import Navbar from "@/components/website/Navbar";
import { motion } from "framer-motion";
import SideMenus from "@/components/website/SideMenus";
import { cn } from "@/lib/utils";
import { CustomSpeedDial } from "@/components/website/CustomSpeedDial";
const Layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <>
        <div className="h-[80px]">
          <Navbar open={open} setOpen={setOpen} />
        </div>
        <CustomSpeedDial />
        {children}
      </>
    </>
  );
};

export default Layout;
