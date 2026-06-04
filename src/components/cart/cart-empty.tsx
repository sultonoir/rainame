import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CartEmpty() {
  return (
    <Card className="border-dashed flex-1 max-w-2xl">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center flex-1">
        <ShoppingBag className="mb-4 size-12 text-muted-foreground/50" />

        <h3 className="text-lg font-medium">Your cart is empty</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Add some items to get started
        </p>

        <Button
          variant="outline"
          className="mt-4 cursor-pointer">
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
}
