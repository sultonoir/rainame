"use client";

import { type Rattings, type Products } from "@prisma/client";
import React from "react";
import { ShoppingCart, Star } from "lucide-react";
import NextImage from "next/image";
import { calculateTotalPrice } from "@/lib/utils";
import { toast } from "sonner";
import { Image, Spinner } from "@nextui-org/react";
import { api } from "@/trpc/react";

type TProducts = {
  product: Products;
  rattings: Rattings[];
  priority?: boolean;
};

const CardProducts = ({ product, rattings, priority }: TProducts) => {
  let totalRating = 0;
  let jumlahRatings = 0;

  // Iterasi melalui setiap objek rating
  for (const rating of rattings) {
    totalRating += rating.value;
    jumlahRatings++;
  }
  const rataRataRating = () => {
    if (jumlahRatings === 0) {
      return 0; // Menghindari pembagian oleh nol jika tidak ada ratings
    } else {
      const ratting = totalRating / jumlahRatings;
      return ratting;
    }
  };
  const rataRata = rataRataRating();

  const result = calculateTotalPrice({
    price: product.price,
    discount: product.discount,
  });

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
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const handleCart = () => {
    cart.mutate({
      productId: product.id,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-large bg-content1 shadow-small">
      {product.discount! > 0 && (
        <div className="absolute right-2.5 top-2.5 z-20 rounded-lg bg-danger px-2 py-1 text-small text-white">
          {product.discount}% off
        </div>
      )}
      <a href={`/product/${product.path}`} className="absolute inset-0" />
      <div className="z-1 group relative flex-shrink-0 overflow-hidden bg-slate-50 dark:bg-slate-300">
        <a href={`/product/${product.path}`} className="relative block">
          <NextImage
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
            src={product.imageUrl.at(0) ?? ""}
            alt="jaja"
            className="aspect-square object-cover"
            width={600}
            height={600}
            priority={priority}
          />
        </a>
        <div className="invisible absolute inset-x-1 bottom-0 flex justify-center opacity-0 transition-all group-hover:visible group-hover:bottom-4 group-hover:opacity-100">
          <button
            className="relative inline-flex h-auto items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs text-slate-50 shadow-lg transition hover:bg-slate-800 active:scale-95 disabled:bg-opacity-90 dark:bg-slate-100 dark:text-slate-800 "
            onClick={handleCart}
          >
            {cart.isLoading ? (
              <Spinner size="sm" />
            ) : (
              <div className="flex items-center gap-2">
                <ShoppingCart />
                Add to cart
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="px-2.5 py-2.5">
        <div>
          <h3 className="truncate text-small font-semibold transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 ">
            {product.subcategory}
          </p>
        </div>
        <div className="flex items-end justify-between ">
          {product.discount && product.discount > 0 ? (
            <div className="inline-flex w-full items-center gap-2 text-start text-medium font-semibold">
              <span className="text-foreground-200 line-through">
                ${result.price}
              </span>
              <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
                <span className="!leading-none text-green-500">
                  ${result.discountedPrice}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
              <span className="!leading-none text-green-500">
                ${result.discountedPrice}
              </span>
            </div>
          )}
          <p className="flex flex-row flex-nowrap items-center gap-x-1 text-xs">
            <Star className="fill-yellow-400 stroke-default-100 stroke-1" />
            <span>{rataRata.toFixed(1)}</span>
            <span>{`(${rattings.length})`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardProducts;
