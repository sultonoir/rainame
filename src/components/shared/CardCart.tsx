"use client";

import useCart from "@/hooks/useCart";
import { api } from "@/trpc/react";
import { Button } from "@nextui-org/react";
import { type Products } from "@prisma/client";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

type Props = {
  product: Products;
  id: string;
};

const CardCart = ({ product, id }: Props) => {
  const { selected, increment, decrement } = useCart();
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

  console.log(product.size);

  return (
    <div className="relative flex py-8 first:pt-0 last:pb-0 sm:py-10 xl:py-12">
      <div className="relative h-36 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-32">
        <Image
          src={product.imageUrl.at(0) ?? ""}
          fill
          alt="name"
          className="object-cover"
        />
        <a href={`/product/${product.path}`} className="absolute inset-0" />
      </div>
      <div className="ml-3 flex flex-1 flex-col sm:ml-6">
        <div>
          <div className="flex justify-between">
            <div className="flex-[1.5] ">
              <h3 className="text-base font-semibold">
                <a href={`/product/${product.path}`}>{product.name}</a>
              </h3>
              <div className="mt-1.5 flex text-sm text-slate-600 dark:text-slate-300 sm:mt-2.5">
                <div className="flex items-center space-x-1.5">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M8.35 1.94995L9.69 3.28992"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2.07 11.92L17.19 11.26"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3 22H16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>{product.color.at(0)}</span>
                </div>
                <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                <div className="flex items-center space-x-1.5">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 9V3H15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3 15V21H9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M21 3L13.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M10.5 13.5L3 21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>{product.size.at(0)}</span>
                </div>
              </div>
              <div className="relative mt-3 flex w-full justify-between sm:hidden">
                <div className="flex w-[104px] items-center justify-between sm:w-28">
                  <Button
                    radius="full"
                    isIconOnly
                    variant="ghost"
                    onClick={() => {
                      decrement({
                        cartId: id,
                        name: product.name,
                        totalPrice: product.discount ? discountedPrice : total,
                        totalProduct: 2,
                        image: product.imageUrl,
                        size: product.size.at(0),
                        color: product.color.at(0),
                        productId: product.id,
                      });
                    }}
                  >
                    <MinusIcon />
                  </Button>
                  <span className="block flex-1 select-none text-center leading-none">
                    {selectedProduct?.totalProduct ?? 1}
                  </span>
                  <Button
                    radius="full"
                    isIconOnly
                    variant="ghost"
                    disabled={selectedProduct?.totalProduct === 0}
                    onClick={() => {
                      increment({
                        cartId: id,
                        name: product.name,
                        totalPrice: product.discount ? discountedPrice : total,
                        totalProduct: 2,
                        image: product.imageUrl,
                        size: product.size.at(0),
                        color: product.color.at(0),
                        productId: product.id,
                      });
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                <div className="">
                  <div className="flex h-full items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
                    <span className="!leading-none text-green-500">
                      {discountedPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden text-center sm:block">
              <div className="nc-NcInputNumber relative z-10 flex items-center justify-between space-x-5">
                <div className="nc-NcInputNumber__content flex w-[104px] items-center justify-between sm:w-28">
                  <Button
                    radius="full"
                    isIconOnly
                    variant="ghost"
                    disabled={selectedProduct?.totalProduct === 0}
                    onClick={() => {
                      decrement({
                        cartId: id,
                        name: product.name,
                        totalPrice: product.discount ? discountedPrice : total,
                        totalProduct: 1,
                        image: product.imageUrl,
                        size: product.size.at(0),
                        color: product.color.at(0),
                        productId: product.id,
                      });
                    }}
                  >
                    <MinusIcon />
                  </Button>
                  <span className="block flex-1 select-none text-center leading-none">
                    {selectedProduct?.totalProduct ?? 0}
                  </span>
                  <Button
                    radius="full"
                    isIconOnly
                    variant="ghost"
                    onClick={() => {
                      increment({
                        cartId: id,
                        name: product.name,
                        totalPrice: product.discount ? discountedPrice : total,
                        totalProduct: 1,
                        image: product.imageUrl,
                        size: product.size.at(0),
                        color: product.color.at(0),
                        productId: product.id,
                      });
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden flex-1 justify-end sm:flex">
              <div className="mt-0.5">
                <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
                  <span className="!leading-none text-green-500">
                    ${discountedPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto flex items-end justify-between pt-4 text-sm">
            <div className="flex items-center justify-center rounded-full border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-3.5 w-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                ></path>
              </svg>
              <span className="ml-1 leading-none">{product.subcategory}</span>
            </div>
            <button
              onClick={() =>
                handleDelete.mutate({
                  id,
                })
              }
              className="relative z-10 mt-3 flex items-center text-sm font-medium text-primary hover:opacity-80 "
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
