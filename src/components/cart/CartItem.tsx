import type { ImageProduct, Product } from "@/server/db/schema";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { calculate } from "@/lib/totalprice";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import useSelected from "@/hook/useSelected";

interface Props {
  product: Product;
  imageProduct: ImageProduct[];
  size: string;
  isSelected?: boolean;
  counter?: React.ReactNode;
  cartId: string;
}

const CartItem = ({
  product,
  imageProduct,
  size,
  isSelected,
  cartId,
  counter,
}: Props) => {
  const { toggle, selected } = useSelected();
  const isChecked = selected.some((item) => item === cartId);

  const handleClick = () => {
    toggle(cartId);
  };

  const totalPrice = calculate({
    discount: product.discount,
    price: product.price,
  });

  return (
    <div
      className={cn("flex gap-4", {
        "bg-secondary p-4": isSelected === true,
      })}
    >
      {isSelected && (
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleClick}
          className="flex-shrink-0"
        />
      )}
      <div className="flex flex-1 gap-2 first:pt-0">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm">
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
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="capitalize">{product.subCategoryId}</span>
                  <span className="mx-2 h-4 border-l border-slate-200 dark:border-slate-700"></span>
                  <span className="uppercase">{size}</span>
                </p>
              </div>
              <div className="mt-0.5">
                <p className="pr-1 text-base font-medium">${totalPrice}</p>
                <p className="mt-1 text-sm text-muted-foreground line-through">
                  ${product.price}
                </p>
              </div>
            </div>
          </div>
          {counter}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
