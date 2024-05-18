"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { type Details, type Product } from "@/server/db/schema";
import useCart from "@/hook/useCart";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { calculate } from "@/lib/totalprice";

interface Props {
  product: Product;
  details: Details[];
}

const AddtoCart = ({ product, details }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState(details.at(0)!.sizeId);
  const { changeSize, setInitial } = useCart();

  const ctx = api.useUtils();
  const { mutate, isPending } = api.cart.createCart.useMutation({
    onMutate: () => {
      setOpen(false);
    },
    onError: (e) => {
      toast.error(e.message);
    },
    onSuccess: () => {
      toast.success("Product Successfully Added");
      setInitial(size, 1);
    },
    onSettled: async () => {
      await ctx.cart.getCart.invalidate();
      await ctx.cart.getIndicator.invalidate();
    },
  });
  const totalPrice = calculate({
    discount: product.discount,
    price: product.price,
  });

  const handleClick = () => {
    mutate({
      size,
      productId: product.id,
      totalPrice: totalPrice,
      totalProduct: 1,
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" variant="outline" className="h-10 w-full">
          Add to cart
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{product.title}</DrawerTitle>
        </DrawerHeader>
        <div className="flex w-full flex-row items-center gap-2 p-4">
          {details.map((item) => (
            <Button
              key={item.id}
              disabled={item.stock === 0}
              onClick={() => {
                setSize(item.sizeId);
                changeSize(item.sizeId);
              }}
              className="w-full"
              size="icon"
              variant={item.sizeId === size ? "default" : "outline"}
            >
              {item.sizeId.toUpperCase()}
            </Button>
          ))}
        </div>
        <DrawerFooter>
          <Button
            onClick={handleClick}
            disabled={isPending}
            isLoading={isPending}
          >
            Submit
          </Button>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddtoCart;
