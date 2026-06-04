"use client";

import { updateCartItem } from "@/modules/cart/cart.action";
import { useCallback, useEffect, useRef } from "react";

type Params = {
  onOptimisticUpdate: (id: string, quantity: number) => void;
};

export function useCartQuantity({ onOptimisticUpdate }: Params) {
  const timers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const latestQuantity = useRef<Map<string, number>>(new Map());

  const updateQuantity = useCallback(
    (itemId: string, currentQuantity: number, increment: boolean) => {
      const nextQuantity = Math.max(1, currentQuantity + (increment ? 1 : -1));

      // optimistic UI
      onOptimisticUpdate(itemId, nextQuantity);

      latestQuantity.current.set(itemId, nextQuantity);

      const existingTimer = timers.current.get(itemId);

      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(async () => {
        const quantity = latestQuantity.current.get(itemId);

        if (!quantity) return;

        try {
          await updateCartItem({ id: itemId, quantity });
        } catch (error) {
          console.error(error);

          // optional rollback
        }
      }, 500);

      timers.current.set(itemId, timer);
    },
    [onOptimisticUpdate],
  );

  useEffect(() => {
    const currentTimers = timers.current;

    return () => {
      currentTimers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, []);

  return {
    updateQuantity,
  };
}
