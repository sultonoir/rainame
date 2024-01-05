"use client";

import useCart from "@/hooks/useCart";
import { api } from "@/trpc/react";
import { Button, Checkbox, Link, User, cn } from "@nextui-org/react";
import { type Products } from "@prisma/client";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  product: Products;
  id: string;
};

const CardCart = ({ product, id }: Props) => {
  const {
    selected,
    onSelect,
    increment,
    decrement,
    onChangeSize,
    onChangeColor,
  } = useCart();
  const selectedProduct = selected.find((item) => item.cartId === id);
  const calculateTotalPrice = () => {
    const price = product.price;
    const amount = 1;
    const discount = product.discount;
    const total = price * amount;
    let discountedPrice = total;
    if (discount && discount > 0) {
      const discountAmount = (total * discount) / 100;
      discountedPrice = total - discountAmount;
    }
    discountedPrice = parseFloat(discountedPrice.toFixed(2));
    return {
      total,
      discountedPrice,
    };
  };
  const { total, discountedPrice } = calculateTotalPrice();

  //handle delete cart
  const ctx = api.useUtils();
  const handleDelete = api.cart.deleteCart.useMutation({
    onSuccess: async () => {
      await ctx.cart.getCart.refetch();
      toast.success("cart deleted");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <Checkbox
      aria-label={product.name}
      classNames={{
        base: cn(
          "inline-flex max-w-none w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border border-default-300",
          {
            "border-primary": selected.some((item) => item.cartId === id),
          },
        ),
        label: "w-full",
      }}
      value={product.id}
      isSelected={selected.some((item) => item.cartId === id)}
      onChange={() =>
        onSelect({
          cartId: id,
          name: product.name,
          image: product.imageUrl,
          totalPrice: product.discount ? discountedPrice : total,
          totalProduct: 1,
          size: product.size.at(0),
          color: product.color.at(0),
          productId: product.id,
        })
      }
    >
      <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
        <div className="flex flex-col justify-center gap-2">
          <User
            classNames={{ base: "justify-start" }}
            avatarProps={{ size: "md", src: product.imageUrl.at(0) }}
            description={<p>${discountedPrice}</p>}
            name={
              <Link
                href={`/product/${product.path}`}
                color="foreground"
                size="sm"
              >
                {product.name}
              </Link>
            }
          />
          <div className="flex flex-col">
            <p className="ml-2 text-sm">Color</p>
            <div className="flex flex-row flex-wrap gap-2">
              {product.color.map((item) => (
                <Button
                  key={item}
                  color={
                    selectedProduct?.color === item ? "primary" : "default"
                  }
                  variant={
                    selectedProduct?.color === item ? "solid" : "bordered"
                  }
                  size="sm"
                  onClick={() =>
                    onChangeColor({
                      cartId: id,
                      color: item,
                    })
                  }
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="ml-2 text-sm">Size</p>
            <div className="flex flex-row flex-wrap gap-2">
              {product.size.map((item) => (
                <Button
                  key={item}
                  color={selectedProduct?.size === item ? "primary" : "default"}
                  variant={
                    selectedProduct?.size === item ? "solid" : "bordered"
                  }
                  size="sm"
                  onClick={() =>
                    onChangeSize({
                      cartId: id,
                      size: item,
                    })
                  }
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 lg:items-end">
          <div className="flex flex-row items-center justify-center gap-1">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => {
                decrement({
                  cartId: id,
                  name: product.name,
                  totalPrice: product.discount ? discountedPrice : total,
                  totalProduct: 1,
                  image: product.imageUrl,
                  size: selectedProduct?.size,
                  color: selectedProduct?.color,
                  productId: product.id,
                });
              }}
            >
              <MinusIcon />
            </Button>
            <p className="h-5 w-5 text-center">
              {selectedProduct?.totalProduct ?? 0}
            </p>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => {
                increment({
                  cartId: id,
                  name: product.name,
                  totalPrice: product.discount ? discountedPrice : total,
                  totalProduct: 1,
                  image: product.imageUrl,
                  size: selectedProduct?.size,
                  color: selectedProduct?.color,
                  productId: product.id,
                });
              }}
            >
              <PlusIcon />
            </Button>
          </div>
          <Button
            isLoading={handleDelete.isLoading}
            fullWidth
            variant="flat"
            color="primary"
            onClick={() =>
              handleDelete.mutate({
                id,
              })
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </Checkbox>
  );
};

export default CardCart;
