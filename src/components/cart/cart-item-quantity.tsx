import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function CartItemQuantity({ quantity, onIncrease, onDecrease }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onDecrease}
        disabled={quantity <= 1}>
        <Minus />
      </Button>

      <span className="w-8 text-center">{quantity}</span>

      <Button
        variant="outline"
        size="icon"
        onClick={onIncrease}>
        <Plus />
      </Button>
    </div>
  );
}
