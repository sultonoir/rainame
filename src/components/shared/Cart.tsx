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

const Cart = () => {
  const { data } = api.cart.getCart.useQuery();
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover
      placement="bottom"
      showArrow
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          className="relative overflow-visible"
        >
          {data && data.length > 0 && (
            <motion.div
              key={data.length}
              className="absolute right-[4px] top-[2px] z-50 flex h-2 w-2 items-center justify-center rounded-full bg-primary p-2 text-xs text-white"
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {data.length}
            </motion.div>
          )}
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" w-[240px] px-1 py-2">
          <div className="flex items-center justify-between border-b border-default-300 pb-2">
            <p className="text-xl font-semibold">Cart</p>
            <Button
              as={Link}
              size="sm"
              variant="light"
              color="primary"
              href="/cart"
              onClick={onClose}
            >
              View all
            </Button>
          </div>
          {!data ? (
            <p>Error</p>
          ) : (
            <>
              {data.length === 0 ? (
                <div className="mt-2 flex flex-col items-center gap-2">
                  <p className="text-xl font-bold">No item on cart</p>
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
                <div className="flex h-fit max-h-[300px] flex-col gap-1 overflow-y-auto">
                  {data.map((item) => {
                    const result = calculateTotalPrice({
                      price: item.products.price,
                      discount: item.products.discount,
                    });
                    return (
                      <Button
                        as={Link}
                        variant="light"
                        radius="none"
                        onClick={onClose}
                        href={`/product/${item.products.path}`}
                        key={item.id}
                        className="mt-2 p-2"
                      >
                        <Image
                          width={40}
                          height={40}
                          src={item.products.imageUrl.at(0)}
                          alt={item.products.name}
                          radius="none"
                          className="aspect-square object-cover p-1"
                        />
                        <p className="grow truncate">{item.products.name}</p>
                        <p className="text-lg font-semibold">
                          ${result.discountedPrice}
                        </p>
                      </Button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
