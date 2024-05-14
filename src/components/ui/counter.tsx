"use client";
import React from "react";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import useCart from "@/hook/useCart";

const Counter = () => {
  const { increment, decrement, amount } = useCart();

  return (
    <div className="flex items-center gap-2 rounded-lg border p-0.5">
      <Button
        size="icon"
        variant="outline"
        className="size-6 border-none hover:bg-transparent"
        disabled={amount <= 1}
        onClick={() => decrement(1)}
      >
        <Minus />
      </Button>
      <span className="size-6 flex-shrink-0 text-center">{amount}</span>
      <Button
        size="icon"
        variant="outline"
        className="size-6 border-none hover:bg-transparent"
        onClick={() => increment(1)}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default Counter;
