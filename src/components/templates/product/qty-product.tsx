"use client";

import { Button } from "@/components/ui/button";
import useCount from "@/hooks/use-count";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

export default function QtyProduct() {
  const { count, decrement, increment } = useCount();
  return (
    <div className="flex rounded-2xl bg-muted/50 p-2">
      <Button
        size="icon"
        variant="outline"
        disabled={count === 1}
        className="size-9 rounded-lg"
        onClick={decrement}
      >
        <MinusIcon />
      </Button>
      <div className="flex size-9 flex-shrink-0 items-center justify-center">
        {count}
      </div>
      <Button
        size="icon"
        disabled={count === 10}
        variant="outline"
        className="size-9"
        onClick={increment}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
