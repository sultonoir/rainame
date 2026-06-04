import { startTransition, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { updateCartItem } from "@/modules/cart/cart.action";

interface UseCartItemQuantityParams {
  itemId: string;
  initialQuantity: number;
  stock: number;
}

export function useCartItemQuantity({
  itemId,
  initialQuantity,
  stock,
}: UseCartItemQuantityParams) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const debouncedQuantity = useDebounce(quantity, 500);
  const [lastSyncedQuantity, setLastSyncedQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (debouncedQuantity === lastSyncedQuantity) return;
    if (debouncedQuantity < 1) return;
    if (debouncedQuantity > stock) return;

    startTransition(async () => {
      await updateCartItem({
        itemId,
        quantity: debouncedQuantity,
      });
    });
  }, [debouncedQuantity, itemId, lastSyncedQuantity, stock]);

  return {
    quantity,
    setQuantity,
    isOutOfStock: quantity > stock,
    isLowStock: stock <= 2,
  };
}
