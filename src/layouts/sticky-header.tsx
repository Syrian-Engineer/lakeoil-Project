"use client";

import cn from "@/utils/class-names";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useWindowScroll } from "@/hooks/use-window-scroll";

type StickyHeaderProps = {
  className?: string;
  offset?: number;
};

export default function StickyHeader({
  offset = 2,
  className,
  children,
}: React.PropsWithChildren<StickyHeaderProps>) {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        " top-0 z-[9999] flex items-center bg-gray-0/80 p-4 backdrop-blur-xl md:px-5 lg:px-6 dark:bg-gray-50/50",
        ((isMounted && windowScroll.y) as number) > offset ? "card-shadow" : "",
        className,
      )}
    >
      {children}
    </header>
  );
}
