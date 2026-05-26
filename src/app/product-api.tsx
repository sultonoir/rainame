import { getBaseUrl } from "@/lib/base-url";

interface Product {
  id: string;
  name: string;
}

const ProductsApi = async () => {
  const response = await fetch(`${getBaseUrl()}/api/v1/products`, {
    cache: "force-cache",
    next: {
      revalidate: 60,
    },
  });
  const { data: products, duration } = await response.json();

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

export default ProductsApi;
