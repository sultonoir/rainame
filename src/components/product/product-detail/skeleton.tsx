import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductPageSkeleton = () => {
  return (
    <div className="flex gap-10 lg:gap-20 min-h-screen flex-col lg:flex-row">
      <div className="space-y-4 flex flex-col w-full items-center">
        <Skeleton className="h-100 w-100 justify-center" />
        <div className="flex flex-wrap gap-2 mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="size-20"
            />
          ))}
        </div>
      </div>
      <div className="space-y-3 w-full">
        <Skeleton className="w-100 h-10" />
        <Skeleton className="w-50 h-5" />
        <Skeleton className="w-80 h-6" />
        <div className="flex flex-wrap gap-2 mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-10 h-5"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-5">
          <Skeleton className="h-10 w-30" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-120 w-100 justify-center mt-10" />
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
