import React from "react";
import { Skeleton } from "../ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <div className="container mx-auto flex h-full max-w-7xl items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="size-10 rounded-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            className="h-5 w-26"
            key={i}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-60" />
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </div>
  );
};

export default NavbarSkeleton;
