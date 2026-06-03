import React from "react";
import { Skeleton } from "../ui/skeleton";

const ReviewSkeleton = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-10 lg:justify-between">
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="flex items-center gap-4"
            key={i}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-62.5" />
              <Skeleton className="h-4 w-50" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="w-80 h-90" />
    </div>
  );
};

export default ReviewSkeleton;
