import { Button } from "@/components/ui/button";
import { addToCart } from "@/modules/cart/cart.action";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  productId: string;
  size?: string;
  quantity: number;
};

const AddToCart = ({ productId, size, quantity }: Props) => {
  const [isPending, startTransition] = useTransition();
  const isDisabled = !size || isPending;

  const handleAddtoCart = () => {
    if (!size) {
      return;
    }
    startTransition(async () => {
      const result = await addToCart({
        productId,
        size,
        quantity
      });

      if (!result.ok) {
        toast.error(result.error.message);
        return;
      }
      toast.success(result.data.message);
    });
  };
  return (
    <Button
      onClick={handleAddtoCart}
      disabled={isDisabled}
      className="h-full w-3/4">
      Add to cart
    </Button>
  );
};

export default AddToCart;
