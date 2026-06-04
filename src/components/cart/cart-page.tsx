import { getCartItems } from "@/modules/cart/cart.action";
import { ShoppingCart } from "./shopping-cart";

const CartPage = async () => {
  const initialData = await getCartItems();
  return <ShoppingCart initialData={initialData} />;
};

export default CartPage;
