"use client";
import {
  Button,
  Chip,
  Image,
  Input,
  Link,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { type DataPayment, type Payment } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import React from "react";
import ModalRating from "../modal/ModalRating";

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
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
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
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <Image
              src={item.imageUrl.at(0)}
              alt={item.name}
              width={100}
              height={100}
              radius="sm"
              className="aspect-square object-cover"
            />
            <div className="flex w-full flex-col border-default-300 sm:border-r-2">
              <div className="flex max-w-[240px] items-center justify-between gap-10">
                <p className="text-medium font-semibold">{item.name}</p>
                <Chip
                  size="sm"
                  variant="flat"
                  color={item.status === "success" ? "success" : "default"}
                >
                  {item.status}
                </Chip>
              </div>
              <div className="flex max-w-[240px] items-center justify-between gap-10">
                <p className="text-small text-default-500">Color : </p>
                <p>{item.color}</p>
              </div>
              <div className="flex max-w-[240px] items-center justify-between gap-10">
                <p className="text-small text-default-500">Size : </p>
                <p>{item.size}</p>
              </div>
              <div className="flex max-w-[240px] items-center justify-between gap-10">
                <p className="text-small text-default-500">Total product : </p>
                <p>{item.totalProduct}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center sm:w-[200px] sm:pr-10">
              <p>Total Price</p>
              <p className="text-lg font-semibold">${item.totalPrice}</p>
            </div>
          </div>
          <div className="mt-2 flex w-full items-center justify-center  gap-5 sm:justify-end">
            <Button
              as={Link}
              href={`/product/${item.name.replaceAll(/[^a-zA-Z0-9]/g, "-")}`}
              size="sm"
              color="primary"
            >
              buy again
            </Button>
            {item.status === "accepted" && (
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
