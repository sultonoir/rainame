import { Button } from "@/components/ui/button";
import { Variant } from "@/modules/product/product.types";

type Props = {
  productId: string;
  variant?: Variant;
};

const AddToCart = ({ productId, variant }: Props) => {
  const isPending = !variant;
  return (
    <Button
      disabled={isPending}
      className="h-full w-3/4">
      Add to cart
    </Button>
  );
};

export default AddToCart;
