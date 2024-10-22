"use client";

import { Button } from "@/components/ui/button";
import useCount from "@/hooks/use-count";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

export default function QtyProduct() {
  const { count, decrement, increment } = useCount();
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold">Quantity</h3>
      <div className="flex w-fit rounded-lg bg-muted/50 p-2">
        <Button
          size="icon"
          variant="outline"
          disabled={count === 1}
          className="size-7 rounded-lg border-none"
          onClick={decrement}
        >
          <MinusIcon size={20} />
        </Button>
        <div className="flex size-7 flex-shrink-0 items-center justify-center">
          {count}
        </div>
        <Button
          size="icon"
          disabled={count === 10}
          variant="outline"
          className="size-7 rounded-lg border-none"
          onClick={increment}
        >
          <PlusIcon size={20} />
        </Button>
      </div>
    </div>
  );
}
