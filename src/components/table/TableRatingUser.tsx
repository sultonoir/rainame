"use client";

import { Image, Input, Pagination } from "@nextui-org/react";
import { type Rattings, type Products } from "@prisma/client";
import { SearchIcon, StarIcon } from "lucide-react";
import React from "react";

type Props = {
  ratings: Array<
    Rattings & {
      products: Products;
    }
  >;
};

const TableRatingUser = ({ ratings }: Props) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredproducts = [...ratings]; // Initialize with an empty array

    if (hasSearchFilter) {
      filteredproducts = ratings.filter((item) =>
        item.products.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredproducts;
  }, [ratings, filterValue]);

  const pages = Math.ceil(filteredItems.length / 15);

  const items = React.useMemo(() => {
    const start = (page - 1) * 15;
    const end = start + 15;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, 15]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <div className="relative flex w-full flex-col gap-5">
      <div className="flex flex-col items-start justify-start space-y-2 md:flex-row">
        <Input
          isClearable
          labelPlacement="outside"
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-default-300 bg-content1 p-3"
        >
          <div className="flex w-full flex-1 last:pb-0">
            <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={item.products.imageUrl.at(0)}
                alt={item.products.name}
              />
              <a
                href={`/product/${item.products.path}`}
                className="absolute inset-0 z-10"
              ></a>
            </div>
            <div className="ml-4 flex w-full flex-1 flex-col">
              <div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="pr-1 text-base font-medium">
                      <a href={`/product/${item.products.path}`}>
                        {item.products.name}
                      </a>
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                      {item.comment}
                    </p>
                  </div>
                  <div className="mt-0.5">
                    <p className="inline-flex">
                      {item.value}{" "}
                      <StarIcon className="fill-yellow-400 stroke-default-100 stroke-1" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {items.length < 1 && (
        <div className="flex flex-col items-center justify-center rounded-medium border border-default-400 bg-content1 p-3">
          <p className="text-lg font-semibold">Ratings not found</p>
        </div>
      )}
      <div className="flex items-center justify-center px-2 py-2">
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
  );
};

export default TableRatingUser;
