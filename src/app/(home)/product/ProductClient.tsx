"use client";
import CardProducts from "@/components/card/CardProducts";
import FormFilterProducts from "@/components/form/FormFilterProducts";
import ModalFilter from "@/components/modal/ModalFilter";
import SearchPage from "@/components/shared/SearchPage";
import { calculateTotalPrice } from "@/lib/utils";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { type Products, type Rattings } from "@prisma/client";
import {
  ArrowDown01,
  ArrowUp01,
  Flame,
  SlidersHorizontal,
  Stars,
} from "lucide-react";
import React from "react";

type Props = {
  products: Array<
    Products & {
      rattings: Rattings[];
    }
  >;
};

const ProductClient = ({ products }: Props) => {
  const [nameFilter, setNameFilter] = React.useState("");
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(products.length / 40);

  const fileterCategory = [
    {
      label: "Most Popular",
      value: "Most Popular",
      icons: Flame,
    },
    {
      label: "Best rattings",
      value: "Best rattings",
      icons: Stars,
    },
    {
      label: "Newest",
      value: "Newest",
      icons: Stars,
    },
    {
      label: "Price low to high",
      value: "Price low to high",
      icons: ArrowDown01,
    },
    {
      label: "Price high to low",
      value: "Price high to low",
      icons: ArrowUp01,
    },
    {
      label: "Discount asc",
      value: "Discount asc",
      icons: ArrowDown01,
    },
    {
      label: "Discount dsc",
      value: "Discount dsc",
      icons: ArrowUp01,
    },
  ];

  const sortOrder = React.useMemo(() => {
    let order = [...products];
    if (nameFilter === "Most Popular") {
      order = order.sort((a, b) => {
        const sellingA = a.selling;
        const sellingB = b.selling;
        return sellingA - sellingB;
      });
    }

    if (nameFilter === "Best rattings") {
      order = order.sort((a, b) => {
        const ratingA = a.rattings[0]?.value ?? 0;
        const ratingB = b.rattings[0]?.value ?? 0;
        return ratingA - ratingB;
      });
    }

    if (nameFilter === "Newest") {
      order = order.sort((a, b) => {
        const itemA = a.createdAt.getMinutes();
        const itemB = b.createdAt.getMinutes();
        return itemA - itemB;
      });
    }
    if (nameFilter === "Price low to high") {
      order = order
        .map((item) => {
          const result = calculateTotalPrice({
            price: item.price,
            discount: item.discount,
          });
          return {
            ...item,
            price: result.discountedPrice,
          };
        })
        .sort((a, b) => {
          const itemA = a.price;
          const itemB = b.price;
          return itemA - itemB;
        });
    }
    if (nameFilter === "Price high to low") {
      order = order
        .map((item) => {
          const result = calculateTotalPrice({
            price: item.price,
            discount: item.discount,
          });
          return {
            ...item,
            price: result.discountedPrice,
          };
        })
        .sort((a, b) => {
          const itemA = a.price;
          const itemB = b.price;
          return itemB - itemA;
        });
    }
    if (nameFilter === "Discount asc") {
      order = order.sort((a, b) => {
        const itemA = a.discount;
        const itemB = b.discount;
        return itemA! - itemB!;
      });
    }
    if (nameFilter === "Discount dsc") {
      order = order.sort((a, b) => {
        const itemA = a.discount;
        const itemB = b.discount;
        return itemB! - itemA!;
      });
    }

    return order;
  }, [nameFilter, products]);

  const items = React.useMemo(() => {
    const start = (page - 1) * 40;
    const end = start + 40;

    return sortOrder.slice(start, end);
  }, [page, sortOrder]);
  return (
    <>
      <div className="left-0 right-0 top-0 h-24 w-full bg-primary-50 dark:bg-neutral-800/20 2xl:h-28 "></div>
      <SearchPage />
      <div className="container space-y-16 py-16 lg:space-y-28 lg:pb-28 lg:pt-20">
        <main>
          <div className="relative mb-12 flex flex-col">
            <div className="flex flex-col justify-between space-y-6 lg:flex-row lg:items-center lg:space-x-2 lg:space-y-0 ">
              <div className="relative flex w-full justify-end text-sm md:text-base">
                <Select
                  placeholder="Sort order"
                  labelPlacement="outside"
                  startContent={<SlidersHorizontal />}
                  className="max-w-[200px]"
                  items={fileterCategory}
                  onChange={(e) => setNameFilter(e.target.value)}
                >
                  {fileterCategory.map((item) => (
                    <SelectItem key={item.value} textValue={item.value}>
                      <div className="flex w-full gap-2">
                        <item.icons />
                        {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <FormFilterProducts />
            <div className="mb-10 flex-shrink-0 border-t lg:mx-4 lg:mb-0 lg:border-t-0"></div>
            {products.length === 0 ? (
              <div className="flex w-full flex-1 items-center justify-center text-2xl font-semibold">
                Product not found
              </div>
            ) : (
              <div className="flex-1">
                <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4 ">
                  {items.map((product) => (
                    <CardProducts
                      key={product.id}
                      product={product}
                      rattings={product.rattings}
                    />
                  ))}
                </div>
                <div className="mt-2 flex justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                  />
                </div>
              </div>
            )}
          </div>
          <ModalFilter />
        </main>
      </div>
    </>
  );
};

export default ProductClient;