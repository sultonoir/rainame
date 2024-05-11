"use client";

import useModal from "@/hooks/useModal";
import { api } from "@/trpc/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
} from "@nextui-org/react";
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
    let total = price * amount;
    let discountedPrice = total;
    if (discount && discount > 0) {
      const discountAmount = (total * discount) / 100;
      discountedPrice = total - discountAmount;
    }
    total = parseFloat(total.toFixed(2));
    discountedPrice = parseFloat(discountedPrice.toFixed(2));
    return {
      total,
      discountedPrice,
    };
  };

  //* mutate addchart
  const router = useRouter();
  const path = usePathname();
  const result = totalPrice();
  const { mutate, isLoading } = api.cart.productPayment.useMutation({
    onSuccess: (e) => {
      router.push(e!);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const discount = result.discountedPrice;
  const price = result.total;

  const { data } = useSession();
  const { onOpen } = useModal();

  //handle add payment
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
      totalPrice: product.discount ? discount : price,
      totalProduct: count,
      imageUrl: product.imageUrl,
    });
  };

  //handle add to cart
  const ctx = api.useUtils();
  const cart = api.cart.addToCart.useMutation({
    onSuccess: async () => {
      await ctx.cart.getCart.invalidate();
      toast(
        <div className="flex h-fit max-h-[350px] w-[408px] flex-col">
          <p className="border-b border-default-300 pb-3 text-xl font-semibold">
            Add to cart
          </p>
          <div className="flex py-5 last:pb-0">
            <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <Image src={product.imageUrl.at(0)} />
              <a
                href={`/product/${product.path}`}
                className="absolute inset-0 z-10"
              ></a>
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="pr-10 text-small font-medium">
                      <a href={`/product/${product.path}`}>{product.name}</a>
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      <span>{product.subcategory}</span>
                      <span className="mx-2 h-4 border-l border-slate-200 dark:border-slate-700"></span>
                      <span>{product.size.at(0)}</span>
                    </p>
                  </div>
                  <div className="mt-0.5">
                    <div className="flex flex-nowrap items-center whitespace-nowrap rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5 ">
                      <span className="!leading-none text-green-500">
                        ${result.discountedPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="text-gray-500 dark:text-slate-400">Qty 1</div>
                <div className="flex">
                  <button className="font-medium text-primary">remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
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
