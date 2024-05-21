/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import CartRemoveIAllitem from "./CartRemoveIAllitem";
import { Checkbox } from "@/components/ui/checkbox";
import useSelected from "@/hook/useSelected";

interface Props {
  cart: string[];
}

const CartHeader = ({ cart }: Props) => {
  const { add, remove, selected } = useSelected();

  const isChecked = cart.length === selected.length;

  const handleClick = (checked: boolean) => {
    if (checked) {
      add(cart);
    } else remove([]);
  };

  return (
    <div className="flex items-center gap-4 bg-secondary pl-4 first:pt-0">
      <Checkbox checked={isChecked} onCheckedChange={handleClick} />
      <div className="flex flex-1 items-center justify-between">
        <p className="font-semibold">Select alll</p>
        <CartRemoveIAllitem />
      </div>
    </div>
  );
};

export default CartHeader;
