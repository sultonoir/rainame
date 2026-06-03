import { getCartItems } from "@/modules/cart/cart.action";

const CartCounter = async () => {
  const cart = await getCartItems();
  if (cart.length == 0) {
    return null;
  }
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="absolute -right-3 -top-1 rounded-full bg-primary px-1 text-xs text-white">
      {totalQuantity >= 99 ? 99 : totalQuantity}
    </div>
  );
};

export default CartCounter;
