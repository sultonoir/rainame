"use client";
import { Button, Input, Link, Pagination, cn } from "@nextui-org/react";
import { type DataPayment, type Payment } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import React from "react";
import ModalRating from "../modal/ModalRating";
import CardItems from "../shared/CardItems";

type Props = {
  payments: Array<
    Payment & {
      dataPayment: DataPayment[];
    }
  >;
};

const TableOrderUser = ({ payments }: Props) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredproducts: DataPayment[] = []; // Initialize with an empty array

    if (hasSearchFilter) {
      filteredproducts = payments.flatMap((item) =>
        item.dataPayment.filter((data) =>
          data.name.toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    } else {
      filteredproducts = payments.flatMap((item) =>
        item.dataPayment.filter((data) => data),
      );
    }

    return filteredproducts;
  }, [payments, filterValue]);

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
    <div className={cn("relative flex w-full flex-col gap-5")}>
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
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-medium border border-default-300 bg-content1 p-3"
        >
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <CardItems
              image={item.imageUrl.at(0)}
              qti={item.totalProduct}
              path={item.name.replaceAll(/[^a-zA-Z0-9]/g, "-")}
              color={item.color}
              name={item.name}
              size={item.size}
              status={item.status}
              totalPrice={item.totalPrice}
            />
          </div>
          <div className="mt-2 flex w-full items-center justify-end gap-5 sm:justify-end">
            <Button
              as={Link}
              href={`/product/${item.name.replaceAll(/[^a-zA-Z0-9]/g, "-")}`}
              size="sm"
              color="primary"
            >
              buy again
            </Button>
            {item.status === "paid" && (
              <ModalRating productId={item.productId} />
            )}
          </div>
        </div>
      ))}
      {items.length < 1 && (
        <div className="flex flex-col items-center justify-center rounded-medium border border-default-400 bg-content1 p-3">
          <p className="text-lg font-semibold">Order not found</p>
          <Button as={Link} href="/product" size="sm" color="primary">
            See more Product
          </Button>
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

export default TableOrderUser;
