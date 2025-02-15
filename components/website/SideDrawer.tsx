import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SideMenus from "./SideMenus";
import { useWebsiteContext } from "./utils/WebsiteContext";
import { ILocation } from "@/utils/data_types";

export const SideDrawer = ({ locations }: { locations: ILocation[] }) => {
  const { drawerOpen, setDrawerOpen } = useWebsiteContext();
  return (
    <Sheet open={drawerOpen} onOpenChange={(open) => setDrawerOpen(open)}>
      {/* <SheetTrigger asChild> */}
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="flex 
        cursor-pointer 
         bg-transparent pl-5  outline-none flex-col items-end
           gap-[6px] group w-[50px]  "
      >
        {["1", "2", "3"].map((item, index) => (
          <span
            key={index}
            className={`h-[2px] bg-background hover:bg-muted t-200 ${
              index == 0 ? "w-[15px]" : index == 1 ? "w-[25px]" : "w-[20px]"
            }
            `}
          ></span>
        ))}
      </button>
      {/* </SheetTrigger> */}
      <SheetContent closeBtn={false} className="p-0  outline-none border-none">
        <SideMenus locations={locations} />
      </SheetContent>
    </Sheet>
  );
};
