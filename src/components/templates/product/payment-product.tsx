"use client";
import useSizes from "@/hooks/useSizes";
import React from "react";
import WishlistButton from "../button/wishlist-button";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import CartCard from "../cart/cart-card";
import useCount from "@/hooks/use-count";
import { useSession } from "@/provider/session-provider";
import { api } from "@/trpc/react";
import { LoadingButton } from "../button/loading-button";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  isWishlist: boolean;
};

const PaymentProduct = (props: Props) => {
  const router = useRouter();
  const { sizes, setSizes } = useSizes();
  const { count, reset } = useCount();
  const { user } = useSession();

  const utils = api.useUtils();
  const { mutate, isPending } = api.cart.create.useMutation({
    onSuccess: async (data) => {
      toast(<CartCard cart={data} />);
      reset();
      setSizes(undefined);

      // Update count
      await Promise.all([
        utils.cart.getCount.cancel(),
        utils.cart.getCartInfinite.cancel(),
      ]);
      utils.cart.getCount.setData(undefined, (oldData) => {
        if (!oldData) return data.amount;
        return oldData + count;
      });

      // Update cart with infinite data
      utils.cart.getCart.setData(undefined, (olData) => {
        if (!olData) {
          return {
            carts: [data],
            count: data.amount,
          };
        }
        return {
          carts: [data, ...olData.carts],
          count: data.amount,
        };
      });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const handlePayment = () => {
    if (!user) {
      return router.push("/login");
    }

    if (!sizes) {
      return toast.error("Please select size");
    }

    mutate({
      userId: user.id,
      amount: count,
      size: sizes.name,
      productId: props.id,
    });
  };

  return (
    <div className="flex gap-2">
      <LoadingButton
        loading={isPending}
        className="h-auto w-full gap-2"
        onClick={handlePayment}
        startContent={<ShoppingBag />}
      >
        Add to cart
      </LoadingButton>
      <WishlistButton
        variant="outline"
        className="h-auto"
        isWislist={props.isWishlist}
        productId={props.id}
      />
    </div>
  );
};

export default PaymentProduct;
