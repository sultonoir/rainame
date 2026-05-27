import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  length?: number;
}

const ProductSkeleton = ({ length = 6, className }: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}>
      {Array.from({ length }).map((_, index) => (
        <div
          className="bg-muted/20 flex flex-col space-y-3 rounded-2xl p-2"
          key={index}>
          <Skeleton className="h-78.75 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-50" />
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-5 w-30" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
