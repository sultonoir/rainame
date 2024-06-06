import FilFetch from "@/components/filter/FilFetch";
import FilSortBy from "@/components/filter/FilSortBy";
import FilterBar from "@/components/filter/FilterBar";
import ProductLoading from "@/components/loading/ProductLoading";
import { type FilterProps } from "@/types";
import React from "react";

const page = ({ searchParams }: FilterProps) => {
  return (
    <div className="container">
      <div className="flex flex-row">
        <FilterBar searchParams={searchParams} />
        <div className="container relative h-full space-y-5 py-4">
          <div className="flex w-full items-center justify-end">
            <FilSortBy />
          </div>
          <React.Suspense
            fallback={
              <ProductLoading
                length={12}
                className="grid-cols-2 lg:grid-cols-4"
              />
            }
          >
            <FilFetch searchParams={searchParams} />
          </React.Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
