import React from "react";
import { cn } from "@/lib/utils";

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background py-2",
        className,
      )}
    >
      {props.children}
    </header>
  );
};

export default Header;
