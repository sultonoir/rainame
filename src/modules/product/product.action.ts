import { cacheLife } from "next/cache";
import { ProductCardSort } from "./product.types";
import { ProductService } from "./product.service";

interface Props {
  sort: ProductCardSort;
}

const products = new ProductService();

export const getProductCard = async ({ sort }: Props) => {
  "use cache";
  cacheLife("hours");
  return products.getProductCard(sort);
};
