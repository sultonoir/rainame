import React, { useState } from "react";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import CartLoading from "./CartLoading";
import CartItem from "./CartItem";
import useCart from "@/hook/useCart";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import useStore from "@/hook/useStore";

interface Props {
  ids: string[];
}

const CartSection = ({ ids }: Props) => {
  const [check, setCheck] = useState(false);
  const { data, isLoading } = api.product.getProductsByIds.useQuery({
    ids,
  });
  const carts = useStore(useCart, (state) => state.cart);

  const subTotal = carts?.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div className="flex h-[calc(100%-60px)] w-full flex-col justify-between">
      {isLoading && <CartLoading />}
      <div className="flex w-full flex-col gap-2 divide-y overflow-y-auto overflow-x-hidden">
        {data?.map((item) => (
          <CartItem
            key={item.id}
            product={item}
            imageProduct={item.imageUrl}
            details={item.details}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 pt-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px]">Subtotal :</p>
          <p className="text-[13px]">${subTotal?.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[12px]">Total :</p>
          <p className="text-base">${subTotal?.toFixed(2)}</p>
        </div>
        <p className="text-[12px] text-muted-foreground">
          Tax included and shipping calculated at checkout
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={check}
            onCheckedChange={() => setCheck(!check)}
          />
          <Label htmlFor="terms" className="text-muted-foreground">
            Accept terms and conditions
          </Label>
        </div>
        <Button disabled={!check}>CHECKOUT</Button>
      </div>
    </div>
  );
};

export default CartSection;
