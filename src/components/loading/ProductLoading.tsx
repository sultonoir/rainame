import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
}

const ProductLoading = ({ className, length = 4 }: Props) => {
  return (
    <div className="h-full space-y-5">
      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4",
          className,
        )}
      >
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="aspect-square" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLoading;
