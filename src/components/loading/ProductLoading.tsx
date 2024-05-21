import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

const ProductLoading = ({ className }: Props) => {
  return (
    <div className={cn("h-full space-y-5", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-6 lg:gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
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
