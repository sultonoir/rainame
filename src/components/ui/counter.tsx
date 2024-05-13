"use client";
import React from "react";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import useCart from "@/hook/useCart";

interface Props {
  id: string;
  price: number;
}

const Counter = ({ id, price }: Props) => {
  const { increment, decrement, cart } = useCart();
  const findcart = cart.find((item) => item.id === id)?.amount;
  const amount = findcart ? findcart : 1;

  return (
    <div className="flex items-center gap-2 rounded-lg border p-0.5">
      <Button
        size="icon"
        variant="outline"
        className="size-6 border-none hover:bg-transparent"
        disabled={amount <= 1}
        onClick={() => decrement({ id, amount: 1, price })}
      >
        <Minus />
      </Button>
      <span className="size-6 flex-shrink-0 text-center">{amount}</span>
      <Button
        size="icon"
        variant="outline"
        className="size-6 border-none hover:bg-transparent"
        onClick={() => increment({ id, amount: 1, price })}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default Counter;
