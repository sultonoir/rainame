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
      <div className="flex w-full flex-col gap-1">
        <Link
          href={`/product/${product.slug}`}
          className="w-[calc(100%-10px)] truncate"
        >
          {product.title}
        </Link>
        {details.at(0)?.sizeId}
        {product.discount > 0 ? (
          <div className="flex items-center justify-start gap-2">
            <p className="text-destructive line-through">${product.price}</p>
            <p className="font-semibold">${totalPrice}</p>
          </div>
        ) : (
          <p className="font-semibold">${product.price}</p>
        )}
        <div className="flex items-center justify-between">
          <Counter id={product.id} price={totalPrice} />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground"
            onClick={() => remove(product.id)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
