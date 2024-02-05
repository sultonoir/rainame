"use client";
"use client";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Link,
  Image,
} from "@nextui-org/react";
import { ShoppingCart } from "lucide-react";
import { api } from "@/trpc/react";
import { calculateTotalPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { Cart, type Products } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type Tax = {
  cart:
    | Array<
        Cart & {
          products: Products;
        }
      >
    | undefined;
};

const Cart = () => {
  const { data } = api.cart.getCart.useQuery();
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(!isOpen);
  };
  const ctx = api.useUtils();
  const { mutate } = api.cart.deleteCart.useMutation({
    onSuccess: async () => {
      await ctx.cart.getCart.invalidate();
    },
  });
  //handle total tax
  function calTotalTax({ cart }: Tax) {
    let totalHarga = 0;
    cart?.map((item) => {
      const priceAfter = item.products.discount
        ? item.products.price * (1 - item.products.discount / 100)
        : item.products.price;
      totalHarga += priceAfter;
    });
    return totalHarga;
  }
  const totalTax = calTotalTax({ cart: data });

  //handle payment
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
    if (data) {
      const pay = data?.map((item) => {
        const cal = calculateTotalPrice({
          price: item.products.price,
          discount: item.products.discount,
        });

        return {
          productId: item.productId,
          name: item.products?.name,
          imageUrl: item.products?.imageUrl,
          totalProduct: 1,
          totalPrice: cal.discountedPrice,
          size: item.products?.size.at(0),
          color: item.products?.color.at(0),
          cartId: item.id,
        };
      });
      payment.mutate({
        path,
        data: pay,
      });
    }
  };

  return (
    <React.Fragment>
      <Button
        as="a"
        href="/cart"
        isIconOnly
        variant="light"
        radius="full"
        className="relative flex md:hidden"
      >
        {data && data.length > 0 && (
          <motion.div
            key={data.length}
            className="absolute right-[5px] top-[5px] z-50 flex h-2 w-2 items-center justify-center rounded-full bg-primary p-2 text-xs text-white"
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {data.length > 100 ? 99 : data.length}
          </motion.div>
        )}
        <ShoppingCart />
      </Button>
      <Popover shouldBlockScroll placement="bottom">
        <PopoverTrigger>
          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="relative hidden md:flex"
          >
            {data && data.length > 0 && (
              <motion.div
                key={data.length}
                className="absolute right-[5px] top-[5px] z-50 flex h-2 w-2 items-center justify-center rounded-full bg-primary p-2 text-xs text-white"
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                {data.length > 100 ? 99 : data.length}
              </motion.div>
            )}
            <ShoppingCart />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="flex items-center justify-between border-b border-default-300 pb-2">
              <p className="text-xl font-semibold">Shopping cart</p>
            </div>
            {!data ? (
              <p>Error</p>
            ) : (
              <>
                {data.length === 0 ? (
                  <div className="mt-2 flex flex-col items-center gap-2">
                    <p className="text-large">cart is empty</p>
                    <Button
                      size="sm"
                      as={Link}
                      onClick={onClose}
                      href="/product"
                      fullWidth
                      color="primary"
                    >
                      See more products
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-fit max-h-[350px] w-[408px] flex-col gap-1 overflow-y-auto pb-2 scrollbar-hide">
                    {data.map((item) => {
                      const result = calculateTotalPrice({
                        price: item.products.price,
                        discount: item.products.discount,
                      });
                      return (
                        <div key={item.id} className="flex py-5 last:pb-0">
                          <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <Image src={item.products.imageUrl.at(0)} />
                            <a
                              href={`/product/${item.products.path}`}
                              className="absolute inset-0 z-10"
                            ></a>
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="pr-1 text-base font-medium">
                                    <a href={`/product/${item.products.path}`}>
                                      {item.products.name}
                                    </a>
                                  </h3>
                                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span>{item.products.subcategory}</span>
                                    <span className="mx-2 h-4 border-l border-slate-200 dark:border-slate-700"></span>
                                    <span>{item.products.size.at(0)}</span>
                                  </p>
                                </div>
                                <div className="mt-0.5">
                                  <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
                                    <span className="!leading-none text-green-500">
                                      ${result.discountedPrice}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500 dark:text-slate-400">
                                Qty 1
                              </div>
                              <div className="flex">
                                <button
                                  onClick={() => {
                                    mutate({
                                      id: item.id,
                                    });
                                  }}
                                  className="font-medium text-primary"
                                >
                                  remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {data && data.length > 0 ? (
              <div className="mt-4 rounded-small bg-content2 p-5">
                <p className="flex justify-between text-large font-semibold text-slate-900 dark:text-slate-100">
                  <span>
                    <span>Subtotal</span>
                    <span className="block text-sm font-normal text-slate-500 dark:text-slate-400">
                      Shipping and taxes calculated at checkout.
                    </span>
                  </span>
                  <span>${totalTax.toFixed(2)}</span>
                </p>
                <div className="mt-5 flex space-x-2">
                  <Button
                    radius="full"
                    as="a"
                    href="/cart"
                    fullWidth
                    className="border border-default-200 bg-white text-black"
                  >
                    View cart
                  </Button>
                  <Button
                    isLoading={payment.isLoading}
                    radius="full"
                    onClick={handlePayment}
                    fullWidth
                    color="primary"
                  >
                    Check out
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
};

export default Cart;
