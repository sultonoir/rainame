import CardProducts from "@/components/card/CardProducts";
import FormFilterProducts from "@/components/form/FormFilterProducts";
import ModalFilter from "@/components/modal/ModalFilter";
import PaginationUi from "@/components/shared/PaginationUi";
import { api } from "@/trpc/server";
import React from "react";

interface Props {
  path?: string;
  min?: string;
  max?: string;
  category?: string;
  colors?: string;
}

interface HomeProps {
  searchParams: Props;
}

const Page = async ({ searchParams }: HomeProps) => {
  const products = await api.product.filterProduct.query(searchParams);

  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      <FormFilterProducts />
      {products.length === 0 ? (
        <div className="flex w-full items-center justify-center text-2xl font-semibold">
          Product not found
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between gap-4">
          <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {products.map((product) => (
              <CardProducts
                key={product.id}
                product={product}
                rattings={product.rattings}
              />
            ))}
          </div>
          <PaginationUi products={products} />
        </div>
      )}
      <ModalFilter />
    </section>
  );
};

export default Page;
