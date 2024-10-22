import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {
  count?: number;
}

export default function CartSkeleton({ count = 10 }: Props) {
  return (
    <React.Fragment>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex w-full gap-4 rounded-2xl">
          <Skeleton className="size-20 flex-shrink-0 overflow-hidden rounded-sm" />
          <div className="flex w-full flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-full" />

            <div className="flex space-x-2">
              <Skeleton className="h-2 w-[5%]" />
              <Skeleton className="h-2 w-[5%]" />
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
