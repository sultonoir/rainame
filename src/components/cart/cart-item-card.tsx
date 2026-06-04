import { Trash2 } from "lucide-react";
import { Image } from "@unpic/react/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CartItemQuantity } from "./cart-item-quantity";
import { CartItemDto } from "@/modules/cart/cart.types";
import { useCartItemQuantity } from "@/hooks/use-cart-item-quantity";

type Props = {
  item: CartItemDto;
  isRemoving: boolean;
  onRemove: (id: string) => void;
};

export function CartItemCard({ item, isRemoving, onRemove }: Props) {
  const { setQuantity, quantity } = useCartItemQuantity({
    itemId: item.id,
    initialQuantity: item.quantity,
    stock: 50,
  });

  //increment qty cart item
  const increment = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  //decrement qty cart item
  const decrement = () => {
    setQuantity((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };
  return (
    <Card
      className={cn("gap-0 overflow-hidden py-0", {
        "opacity-50": isRemoving,
      })}>
      <div className="flex flex-col sm:flex-row">
        <Image
          src={item.image.url}
          alt={item.name}
          className=" object-fill"
          layout="constrained"
          width={150}
          height={400}
          aspectRatio={3 / 4}
        />

        <div className="flex-1 p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium">{item.name}</h3>

              <p className="text-sm text-muted-foreground">{item.size}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}>
              <Trash2 />
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <CartItemQuantity
              quantity={quantity}
              onDecrease={decrement}
              onIncrease={increment}
            />

            <div className="text-end">
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              {item.originalPrice > item.price && (
                <p className="text-muted-foreground text-xs line-through">
                  ${item.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
