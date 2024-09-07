"use client";
import { Button } from "@/components/ui/button";
import useSizes from "@/hooks/useSizes";
import React from "react";
import WishlistButton from "../button/wishlist-button";

type Props = {
  id: string;
};

const PaymentProduct = (props: Props) => {
  const { sizes } = useSizes();
  return (
    <div className="flex gap-2">
      <Button className="w-full">Add to cart</Button>
      <WishlistButton
        variant="outline"
        isWislist={false}
        productId={props.id}
      />
    </div>
  );
};

export default PaymentProduct;
