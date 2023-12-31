"use client";
import { api } from "@/trpc/react";
import React from "react";
import { Button, Checkbox } from "@nextui-org/react";
import useCart from "@/hooks/useCart";
import { calculateTotalPrice } from "@/lib/utils";
import CardCart from "@/components/shared/CardCart";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const Page = () => {
  const { data } = api.cart.getCart.useQuery();
  const cart = useCart();
  const selected = cart.selected;
  let totalPrice = 0;
  let countPrice = 0;

  for (const isSelected of selected) {
    totalPrice += isSelected.totalPrice;
    countPrice++;
  }

  const callculatePrice = () => {
    if (countPrice === 0) {
      return 0;
    }
    const tot = parseFloat(totalPrice.toFixed(2));
    return tot;
  };

  const isSeletedPrice = callculatePrice();

  let totalProduct = 0;
  let countProduct = 0;

  for (const isSelected of selected) {
    totalProduct += isSelected.totalProduct;
    countProduct++;
  }

  const callculateProduct = () => {
    if (countProduct === 0) {
      return 0;
    }
    return totalProduct;
  };

  const isSeletedProduct = callculateProduct();

  const handleSelectionAll = () => {
    if (data) {
      const cartAll = data.map((item) => {
        const result = calculateTotalPrice({
          price: item.products.price,
          discount: item.products.discount,
        });
        return {
          cartId: item.id,
          productId: item.productId,
          name: item.products.name,
          image: item.products.imageUrl,
          totalPrice: result.discountedPrice,
          totalProduct: 1,
          size: item.products.size.at(0),
          color: item.products.color.at(0),
        };
      });
      cart.onSelectedAll(cartAll);
    }
  };

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
    <section className="relative flex min-h-screen flex-col gap-5 lg:flex-row">
      <div className="flex grow flex-col gap-2">
        <label className="flex items-center gap-2 pb-2">
          <Checkbox
            type="checkbox"
            color="primary"
            onChange={handleSelectionAll}
            className="ml-2.5"
            isSelected={selected.length === data?.length && selected.length > 0}
          />
          <p className="cursor-pointer font-semibold">Select all</p>
        </label>
        {data?.map((product) => (
          <CardCart
            key={product.id}
            product={product.products}
            id={product.id}
          />
        ))}
      </div>

      <div className="sticky bottom-0 h-fit w-full rounded-lg border border-default-300 bg-content1 p-5 lg:top-0 lg:max-w-xs">
        <p className="text-lg font-semibold">Shopping summary</p>
        <div className="my-3 flex flex-col">
          <div className="flex justify-between">
            <p className="text-large opacity-80">Total Price</p>
            <p className="">${isSeletedPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-large opacity-80">Total Product</p>
            <p className="">{isSeletedProduct}</p>
          </div>
        </div>
        <Button
          fullWidth
          size="sm"
          color="primary"
          isLoading={payment.isLoading}
          onClick={handlePayment}
        >
          Paynow
        </Button>
      </div>
    </section>
  );
};

export default Page;
