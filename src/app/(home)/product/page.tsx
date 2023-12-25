import CardProducts from "@/components/card/CardProducts";
import FormFilterProducts from "@/components/form/FormFilterProducts";
import { api } from "@/trpc/server";
import React from "react";

const Page = async () => {
  const products = await api.product.getAllProduct.query();

  return (
    <>
      <section className="flex flex-col gap-4 lg:flex-row">
        <FormFilterProducts />
        <div className="flex flex-col gap-4">
          <div className="grid h-fit grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <CardProducts
                key={product.id}
                product={product}
                rattings={product.rattings}
              />
            ))}
          </div>
          <button className="mt-auto bg-primary">hallo</button>
        </div>
      </section>
    </>
  );
};

export default Page;
