import { api } from "@/lib/api-client";

interface Product {
  id: string;
  name: string;
}

const ProductsElysia = async () => {
  const { data } = await api.get();

  return (
    <div className="flex flex-col space-y-2">
      <h2>Products rendered in {data?.duration}</h2>
      <ul className="list-disc list-inside">
        {data?.data.map((product: Product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsElysia;
