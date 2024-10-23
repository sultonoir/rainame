import React from "react";
import { LoadingButton } from "../button/loading-button";
import { X } from "lucide-react";
import { api } from "@/trpc/react";

type Props = {
  cartId: string;
};

export default function CartRemoveButton({ cartId }: Props) {
  const utils = api.useUtils();
  const { mutate, isPending } = api.cart.removeById.useMutation({
    onSuccess: async (data) => {
      // Update count
      utils.cart.getCount.setData(undefined, (oldData) => {
        if (!oldData) return 1;
        return oldData - data.amount;
      });

      // Update cart with infinite data
      await utils.cart.getCartInfinite.cancel();
      utils.cart.getCartInfinite.setInfiniteData({ limit: 10 }, (oldData) => {
        if (!oldData) {
          return {
            pages: [],
            pageParams: [],
          };
        }
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            cart: page.cart.filter((item) => item.id !== data.id),
          })),
        };
      });
    },
  });
  const handleClick = () => {
    mutate({
      cartId,
    });
  };
  return (
    <LoadingButton
      disabled={isPending}
      loading={isPending}
      onClick={handleClick}
      variant="ghost"
      size="icon"
      className="size-6"
      startContent={<X className="size-4" />}
    />
  );
}
