import Link from "next/link";
import React, { Suspense } from "react";
import CartCounter from "./cart-counter";
import { Button } from "../ui/button";
import { IconShoppingCart } from "@tabler/icons-react";

const CartLink = () => {
  return (
    <div className="relative isolate">
      <Button
        asChild
        variant="ghost"
        aria-label="button cart"
        size="icon">
        <Link
          prefetch={true}
          href="/carts">
          <IconShoppingCart />
        </Link>
      </Button>
      <Suspense>
        <CartCounter />
      </Suspense>
    </div>
  );
};

export default CartLink;
