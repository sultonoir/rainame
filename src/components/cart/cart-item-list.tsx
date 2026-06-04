import { CartItemDto } from "@/modules/cart/cart.types";
import { CartEmpty } from "./cart-empty";
import { CartItemCard } from "./cart-item-card";

type Props = {
  items: CartItemDto[];
  isRemoving: boolean;
  onRemove: (id: string) => void;
};

export function CartItemList({ items, isRemoving, onRemove }: Props) {
  if (!items.length) {
    return <CartEmpty />;
  }

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-2xl">
      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          isRemoving={isRemoving}
          onRemove={onRemove}
          
        />
      ))}
    </div>
  );
}
