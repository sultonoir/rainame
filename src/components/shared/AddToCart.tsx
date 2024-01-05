"use client";
import useModal from "@/hooks/useModal";
import { api } from "@/trpc/react";
import { Button } from "@nextui-org/react";
import { type Products } from "@prisma/client";
import { ShoppingCartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

type Props = {
  product: Products;
};

const AddToCart = ({ product }: Props) => {
  const { data } = useSession();
  const { onOpen } = useModal();
  const ctx = api.useUtils();
  const cart = api.cart.addToCart.useMutation({
    onSuccess: async () => {
      await ctx.cart.getCart.refetch();
      toast.success("success add to cart");
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const handleCart = () => {
    if (!data) {
      return onOpen();
    }
    cart.mutate({
      productId: product.id,
    });
  };
  return (
    <Button
      isIconOnly
      variant="flat"
      onClick={handleCart}
      isLoading={cart.isLoading}
    >
      <ShoppingCartIcon size={15} />
    </Button>
  );
};

export default AddToCart;
