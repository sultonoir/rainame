import { Store, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContinueShoppingButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full cursor-pointer">
      <Store />
      Continue Shopping
      <MoveRight />
    </Button>
  );
}
