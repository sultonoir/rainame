import { ShoppingBag, CreditCard } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SecureCheckoutCard } from "./secure-checkout-card";
import { ContinueShoppingButton } from "./continue-shopping-button";

type Props = {
  itemsLength: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
};

export function OrderSummary({
  itemsLength,
  subtotal,
  savings,
  shipping,
  total,
}: Props) {
  return (
    <div className="w-full lg:w-96 flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>

              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            {savings > 0 && (
              <div className="flex justify-between text-sm font-medium">
                <span>You Save</span>

                <span>-${savings.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-medium">Total</span>

            <div className="text-end">
              <p className="text-xl font-bold">${total.toFixed(2)}</p>

              <p className="text-xs text-muted-foreground">
                including VAT, if applicable
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-4 w-full cursor-pointer"
            disabled={itemsLength === 0}>
            <ShoppingBag />
            Proceed to Checkout
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="size-3.5" />

            <span>Secure payment with SSL encryption</span>
          </div>
        </CardContent>
      </Card>
      <SecureCheckoutCard />
      <ContinueShoppingButton />
    </div>
  );
}
