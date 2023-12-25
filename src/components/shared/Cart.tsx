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
          {data && data.products.length > 0 && (
            <span className="absolute right-[4px] top-[2px] z-50 flex h-2 w-2 items-center justify-center rounded-full bg-primary p-2 text-xs">
              {data.products.length}
            </span>
          )}
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-[240px] px-1 py-2">
          <div className="flex items-center justify-between border-b border-default-300 pb-2">
            <p className="text-xl font-semibold">Cart</p>
            <Button
              as={Link}
              size="sm"
              variant="light"
              color="primary"
              href="/product"
              onClick={onClose}
            >
              See more
            </Button>
          </div>
          {!data ? (
            <p>Error</p>
          ) : (
            <>
              {data.products.length === 0 ? (
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
                <div className="flex flex-col gap-1">
                  {data.products.map((item) => (
                    <div key={item.id} className="mt-2 flex flex-row gap-1">
                      <Image
                        width={40}
                        height={40}
                        src={""}
                        alt={item.name}
                        radius="none"
                        className="aspect-square object-cover"
                      />
                      <p></p>
                    </div>
                  ))}
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
