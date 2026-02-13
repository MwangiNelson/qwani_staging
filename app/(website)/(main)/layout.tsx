import React, { ReactNode, Suspense } from "react";
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import { SpeedDialViewer } from "@/components/website/utils/speed_dial_viewer";
import { fetchLocations } from "@/lib/api";

const Layout = async ({ children }: { children: ReactNode }) => {
  const locations = await fetchLocations();
  return (
    <div className="overflow-x-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 h-[100px] z-50">
        <Suspense>
          <Navbar locations={locations} />
        </Suspense>
      </div>
      <SpeedDialViewer />
      {/* Main content - no negative margin needed with fixed navbar */}
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
