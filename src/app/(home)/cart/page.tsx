"use client";
import { api } from "@/trpc/react";
import React from "react";
import { Button, Skeleton } from "@nextui-org/react";
import useCart, { type Cart } from "@/hooks/useCart";
import CardCart from "@/components/shared/CardCart";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { data, isLoading } = api.cart.getCart.useQuery();
  const cart = useCart();
  // Menghitung total harga
  const calculateTotalPrice = (items: Cart[]) => {
    const totalPrice = items.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );
    return parseFloat(totalPrice.toFixed(2));
  };

  // Menghitung total produk
  const calculateTotalProduct = (items: Cart[]) => {
    return items.reduce((total, item) => total + item.totalProduct, 0);
  };

  // Mendapatkan nilai total harga dan total produk dari 'selected'
  const selected = cart.selected;
  const isSeletedPrice = calculateTotalPrice(selected);
  const isTotalProduct = calculateTotalProduct(selected);

  // handle payment cart
  const path = usePathname();
  const router = useRouter();
  const payment = api.cart.cartPayment.useMutation({
    onSuccess: (e) => {
      router.push(e!);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const handlePayment = () => {
    if (selected.length === 0) {
      return toast.error("no products selected");
    }
    const data = selected.map((item) => ({
      productId: item.productId,
      name: item.name,
      imageUrl: item.image,
      totalProduct: item.totalProduct,
      totalPrice: item.totalPrice,
      size: item.size,
      color: item.color,
      cartId: item.cartId,
    }));

    payment.mutate({ path, data });
  };

  return (
    <section className="container my-2 min-h-screen">
      <div className="my-12 sm:mb-16">
        <h2 className="block text-2xl font-semibold sm:text-3xl lg:text-4xl ">
          Shopping cart
        </h2>
        <div className="mt-3 block text-xs font-medium text-slate-700 dark:text-slate-400 sm:mt-5 sm:text-sm">
          <a className="" href="/">
            Homepage
          </a>
          <span className="mx-1 text-xs sm:mx-1.5">/</span>
          <a className="" href="/collection">
            Clothing Categories
          </a>
          <span className="mx-1 text-xs sm:mx-1.5">/</span>
          <span className="underline">Shopping Cart</span>
        </div>
      </div>
      <hr className="mb-10 border-slate-200 dark:border-slate-700 xl:mb-12" />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full divide-y divide-slate-200 dark:divide-slate-700 lg:w-[60%] xl:w-[55%]">
          {isLoading ? (
            <div className="flex w-full flex-col items-center gap-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  className="flex w-full items-center justify-between gap-3"
                  key={index}
                >
                  <div>
                    <Skeleton className="flex h-36 w-24 rounded-large" />
                  </div>
                  <div className="ml-3 flex h-36 flex-1 flex-col justify-start gap-2 sm:ml-6">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>

                  <div className="ml-3 flex h-36 flex-1 justify-end  sm:ml-6">
                    <Skeleton className="h-10 w-1/5 justify-end rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {!data ? (
                <>fetching error</>
              ) : (
                <>
                  {data.length < 1 ? (
                    <h3 className="text-center text-lg font-semibold">
                      Cart is empty
                    </h3>
                  ) : (
                    <>
                      {data?.map((item) => (
                        <CardCart
                          product={item.products}
                          id={item.id}
                          key={item.productId}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div className="my-10 flex-shrink-0 border-t border-slate-200 dark:border-slate-700 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20" />
        <div className="flex-1">
          <div className="sticky top-28">
            <h3 className="text-lg font-semibold ">Order summary</h3>
            <div className="mt-7 divide-y divide-slate-200/70 text-sm text-slate-500 dark:divide-slate-700/80 dark:text-slate-400">
              <div className="flex justify-between py-4">
                <span>Qty</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {isTotalProduct}
                </span>
              </div>
              <div className="flex justify-between pt-4 text-base font-semibold text-slate-900 dark:text-slate-200">
                <span>Order total</span>
                <span>${isSeletedPrice}</span>
              </div>
            </div>
            <Button
              isLoading={payment.isLoading}
              fullWidth
              color="primary"
              variant="solid"
              className="mt-8"
              onClick={handlePayment}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
