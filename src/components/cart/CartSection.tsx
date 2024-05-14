import React from "react";
import { api } from "@/trpc/react";
import CartLoading from "./CartLoading";
import CartItem from "./CartItem";

interface Props {
  ids: string[];
}

const CartSection = ({ ids }: Props) => {
  const { data, isLoading } = api.product.getProductsByIds.useQuery({
    ids,
  });


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
    </div>
  );
};

export default CartSection;
