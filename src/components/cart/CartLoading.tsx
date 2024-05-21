import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  length?: number;
}

const CartLoading = ({ length = 5 }: Props) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length }).map((_, index) => (
        <div className="flex w-full gap-2" key={index}>
          <Skeleton className="h-24 w-20 flex-shrink-0" />
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-1/2 rounded-full" />
            <Skeleton className="h-4 w-1/4 rounded-full" />
            <Skeleton className="h-4 w-1/4 rounded-full" />
            <Skeleton className="h-4 w-1/3 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartLoading;
