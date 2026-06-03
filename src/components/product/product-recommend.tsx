import Link from "next/link";
import { Button } from "../ui/button";
import ProductCard from "./product-card";
import { getRecommend } from "@/modules/product/product.action";

type Props = {
  productId: string;
  subcategory: string;
  category: string;
};

const ProductRecommend = async (props: Props) => {
  const data = await getRecommend(props);

  if (!data) {
    return null;
  }
  const { products, link } = data;
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Related Product</p>
        <Button asChild>
          <Link href={`/collections/${link}`}>Browse all</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommend;
