import useCart from "@/hook/useCart";
import type { Details, ImageProduct, Product } from "@/server/db/schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Counter from "../ui/counter";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  product: Product;
  imageProduct: ImageProduct[];
  details: Details[];
}

const CartItem = ({ product, imageProduct, details }: Props) => {
  const { remove } = useCart();
  function calculated() {
    const price = product.price;
    const discount = product.discount;
    let total = price;

    if (discount && discount > 0) {
      const discountAmount = (price * discount) / 100;
      total = price - discountAmount;
    }
    total = parseFloat(total.toFixed(2));
    return total;
  }

  const totalPrice = calculated();
  return (
    <div className="flex gap-2 pt-3">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        {imageProduct.map((item) => (
          <Image
            key={item.id}
            src={item.url}
            alt={product.title}
            fill
            placeholder="blur"
            className="object-cover"
            blurDataURL={item.blur}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ))}
      </div>
      <div className="ml-4 flex flex-1 flex-col space-y-3">
        <div>
          <div className="flex justify-between">
            <div>
              <Link
                href={`/product/${product.slug}`}
                className="pr-1 text-base font-medium"
              >
                {product.title}
              </Link>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span className="capitalize">{product.subCategoryId}</span>
                <span className="mx-2 h-4 border-l border-slate-200 dark:border-slate-700"></span>
                <span>{details.at(0)?.sizeId}</span>
              </p>
            </div>
            <div className="mt-0.5">
              <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
                <span className="!leading-none text-green-500">
                  ${totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Counter id={product.id} price={totalPrice} />
          <Button
            size="icon"
            variant="ghost"
            className=" rounded-full text-destructive hover:text-destructive"
            onClick={() => remove(product.id)}
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
