import { api } from "@/trpc/server";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const TopProduct = async () => {
  const products = await api.product.filterProduct.query({
    take: "5",
    page: "1",
  });
  const topSale = products.sort((a, b) => {
    const topA = a.selling;
    const topB = b.selling;
    const result = topB - topA;
    return result;
  });
  return (
    <div className="col-span-1 rounded-large border border-default bg-content1 p-4">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Top products</h3>
        <Button as="a" href="/admin/product" size="sm" color="primary">
          View more
        </Button>
      </div>
      <div className="flex flex-col space-y-5">
        {topSale.map((item, i) => (
          <div key={item.id} className="flex py-2 last:pb-0">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <a
                href={`/product/${item.path}`}
                className="absolute inset-0 z-10"
              >
                <Image
                  src={item.imageUrl.at(0) ?? ""}
                  alt={item.name}
                  fill
                  className="aspect-square object-cover"
                  priority
                />
              </a>
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="pr-1 text-base font-medium">
                      <a href={`/product/${item.path}`}>{item.name}</a>
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      <span>{item.subcategory}</span>
                      <span className="mx-2 h-4 border-l border-slate-200 dark:border-slate-700"></span>
                      <span>{item.selling}</span>
                    </p>
                  </div>
                  <div className="mt-0.5">
                    <div className="flex items-center rounded-lg border-2 border-green-500 px-2 py-1 text-sm font-medium md:px-2.5 md:py-1.5">
                      <span className="!leading-none text-green-500">
                        #{i + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProduct;
