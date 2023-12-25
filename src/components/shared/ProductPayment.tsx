"use client";

import useModal from "@/hooks/useModal";
import { calculateTotalPrice } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Button, Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import { type Products } from "@prisma/client";
import {
  BanknoteIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  product: Products;
  color: string;
  size?: string;
};

const ProductPayment = ({ product, color, size }: Props) => {
  const [count, setCount] = useState(1);
  const stock = product?.stock;
  const increment = () => {
    if (stock && count - stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const totalPrice = () => {
    const price = product.price;
    const amount = count;
    const discount = product.discount;
    const total = price * amount;
    let discountedPrice = total;
    if (discount && discount > 0) {
      const discountAmount = (total * discount) / 100;
      discountedPrice = total - discountAmount;
    }
    return {
      total,
      discountedPrice,
    };
  };

  //* mutate addchart
  const router = useRouter();
  const path = usePathname();
  const result = totalPrice();
  const { mutate, isLoading } = api.product.productPayment.useMutation({
    onSuccess: (e) => {
      router.push(e!);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const discount = result.discountedPrice;
  const price = result.total;

  const amount = calculateTotalPrice({
    price: product.price,
    discount: product.discount,
  });

  const amountPrice = amount.discountedPrice;
  const { data } = useSession();
  const { onOpen } = useModal();

  const handlePayment = () => {
    if (!data) {
      return onOpen();
    }
    if (!color || !size) {
      return toast.error("Color & size not selected yet");
    }
    mutate({
      productId: product.id,
      path,
      name: product.name,
      color,
      size,
      totalPrice: amountPrice,
      totalProduct: count,
    });
  };

  //handle add to cart
  const cart = api.cart.addToCart.useMutation({
    onSuccess: () => {
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
      name: product.name,
      totalPrice: price,
      totalProduct: count,
    });
  };

  return (
    <div className="sticky top-24">
      <Card>
        <CardBody className="flex w-full flex-col gap-2.5">
          <Input
            startContent={
              <Button onClick={decrement} className="bg-transparent" isIconOnly>
                <MinusIcon />
              </Button>
            }
            type="number"
            size="md"
            labelPlacement="outside"
            maxLength={100}
            max={100}
            value={count.toString()}
            classNames={{
              inputWrapper: "px-0",
            }}
            onValueChange={(value) => {
              if (value && !isNaN(Number(value))) {
                // Pastikan value adalah angka
                const numericValue = Number(value);
                if (numericValue < 1) {
                  setCount(1); // Setel nilainya menjadi 1 jika kurang dari 1
                } else if (numericValue <= stock) {
                  setCount(numericValue);
                } else {
                  setCount(stock); // Jika melebihi stock, tetapkan ke stock
                }
              }
            }}
            endContent={
              <Button onClick={increment} className="bg-transparent" isIconOnly>
                <PlusIcon />
              </Button>
            }
          />
          {color !== "" && (
            <div className="flex w-full items-center justify-between">
              <p>Color</p>
              <p>{color}</p>
            </div>
          )}
          {size && (
            <div className="flex w-full items-center justify-between">
              <p>Size</p>
              <p>{size}</p>
            </div>
          )}
          <div className="flex w-full items-center justify-between">
            <p>Stock</p>
            <p>{product.stock}</p>
          </div>
          {product.discount && product.discount > 0 ? (
            <div className="flex w-full justify-between text-start text-medium font-semibold">
              <p>Total</p>
              <div className="flex gap-2">
                <p className="text-foreground-200 line-through">${price}</p>
                <p className="w-full text-start text-medium font-semibold">
                  ${discount}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-between text-start text-medium font-semibold">
              <p>Total</p>
              <span>${price}</span>
            </div>
          )}
        </CardBody>
        <CardFooter className="gap-x-2">
          <Button
            isLoading={isLoading}
            variant="solid"
            color="primary"
            className="w-full"
            onClick={handlePayment}
          >
            <BanknoteIcon size={14} />
            <p>Pay now</p>
          </Button>
          <Button
            isIconOnly
            variant="flat"
            onClick={handleCart}
            isLoading={cart.isLoading}
          >
            <ShoppingCartIcon size={15} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductPayment;
