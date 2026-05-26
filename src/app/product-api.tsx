import { db } from "@/lib/db";
import { cacheLife } from "next/cache";

interface Product {
  id: string;
  name: string;
}

const ProductsApi = async () => {
  const { data: products, duration } = await getProducts();

  return (
    <div className="flex flex-col space-y-2">
      <h2>Products rendered in {duration}</h2>
      <ul className="list-disc list-inside">
        {products.map((product: Product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

async function getProducts() {
  "use cache";
  cacheLife("hours");
  const start = performance.now();
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
    },
    take: 10,
  });
  const end = performance.now();
  const duration = end - start;
  return {
    duration: duration.toFixed(0) + "ms",
    data: products,
  };
}

export default ProductsApi;
