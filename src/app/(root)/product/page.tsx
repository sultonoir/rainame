import FilFetch from "@/components/filter/FilFetch";
import FilSortBy from "@/components/filter/FilSortBy";
import FilterBar from "@/components/filter/FilterBar";

import React from "react";

const page = () => {
  return (
    <div className="container">
      <div className="flex flex-row gap-2">
        <FilterBar />
        <div className="relative h-full space-y-5 py-4">
          <div className="flex w-full items-center justify-end">
            <FilSortBy />
          </div>
          <FilFetch />
        </div>
      </div>
    </div>
  );
};

export default page;
