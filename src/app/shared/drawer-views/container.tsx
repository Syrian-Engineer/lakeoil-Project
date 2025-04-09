"use client";

import { Drawer } from "rizzui";
import { useEffect } from "react";
import cn from "@/utils/class-names";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/app/shared/drawer-views/use-drawer";

export default function GlobalDrawer() {
  const { isOpen, view, placement, closeDrawer, containerClassName } =
    useDrawer();
  const pathname = usePathname();
  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName={cn(
        "dark:bg-gray-100 min-w-min max-w-[320px]",
        containerClassName
      )}
      className="z-[9999] h-screen"
    >
      {view}
    </Drawer>
  );
}
