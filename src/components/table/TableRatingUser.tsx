"use client";

import {
  Image,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
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
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
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

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

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

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-center justify-between">
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
        <label className="flex w-fit items-center gap-2 text-small text-default-400">
          <p className="whitespace-nowrap">Rows per page:</p>
          <Select
            size="sm"
            labelPlacement="outside"
            aria-label="number options displayed"
            defaultSelectedKeys={["15"]}
            className="w-20"
            onChange={onRowsPerPageChange}
          >
            <SelectItem key={"5"} value="5">
              5
            </SelectItem>
            <SelectItem key={"10"} value="10">
              10
            </SelectItem>
            <SelectItem key={"15"} value="15">
              15
            </SelectItem>
          </Select>
        </label>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-medium border border-default-300 bg-content1 p-3"
        >
          <div className="flex flex-row items-center gap-5">
            <Image
              src={item.products.imageUrl.at(0)}
              alt={item.products.name}
              width={100}
              height={100}
              radius="sm"
              className="aspect-square object-cover"
            />
            <div className="flex w-full flex-col">
              <p className="text-medium font-semibold">{item.products.name}</p>
              <p className="inline-flex">
                {item.value}{" "}
                <StarIcon className="fill-yellow-400 stroke-default-100 stroke-1" />
              </p>
              <p>{`"${item.comment}"`}</p>
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
