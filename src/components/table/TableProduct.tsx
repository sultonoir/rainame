import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  type Selection,
  type SortDescriptor,
  Select,
  SelectItem,
  User,
  Chip,
} from "@nextui-org/react";

import { capitalize, columns } from "@/lib/utils";
import { ChevronDownIcon, SearchIcon, TrashIcon } from "lucide-react";
import ModalCreateProduct from "../modal/ModalCreateProduct";
import { type Products } from "@prisma/client";
import ModalEditProduct from "../modal/ModalEditProduct";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "price",
  "stock",
  "actions",
  "category",
];

type TProduct = {
  products: Products[];
};

export default function TableProduct({ products }: TProduct) {
  const newProducts = products.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));

  type NewProducts = (typeof newProducts)[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "price",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const deleteFilter = React.useMemo(() => {
    if (selectedKeys === "all") return products;

    return products.filter((product) =>
      Array.from(selectedKeys).includes(product.id),
    );
  }, [selectedKeys]);

  const filteredItems = React.useMemo(() => {
    let filteredproducts = [...newProducts];

    if (hasSearchFilter) {
      filteredproducts = filteredproducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredproducts;
  }, [newProducts, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: NewProducts, b: NewProducts) => {
      const first = a[sortDescriptor.column as keyof NewProducts] as number;
      const second = b[sortDescriptor.column as keyof NewProducts] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // edit product
  const editProduct = React.useCallback((id: string) => {
    const product = products.find((e) => e.id === id);
    return product;
  }, []);

  //delete product
  const ctx = api.useUtils();
  const { mutate, isLoading } = api.product.deleteByid.useMutation({
    onSuccess: async () => {
      await ctx.product.getAllProduct.refetch();
      toast.success("Product deleted");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  // delete product selection
  const { mutate: deleteSelection, isLoading: loading } =
    api.product.deleteAll.useMutation({
      onSuccess: async () => {
        await ctx.product.getAllProduct.refetch();
        toast.success("Product deleted");
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  const renderCell = React.useCallback(
    (product: NewProducts, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof NewProducts];

      switch (columnKey) {
        case "name":
          return (
            <User
              classNames={{ description: "truncate max-w-[200px]" }}
              avatarProps={{ radius: "full", src: product.imageUrl.at(0) }}
              description={product.desc}
              name={cellValue}
            />
          );
        case "price":
          return <p>$ {cellValue}</p>;
        case "category":
          return (
            <Chip
              className="capitalize"
              color="primary"
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );

        case "size":
          return (
            <div className="flex flex-row">
              {product.size.map((item, index) => (
                <React.Fragment key={item}>
                  <p>{item},</p>
                  {index !== product.size.length - 1 && <p>&nbsp;</p>}
                </React.Fragment>
              ))}
            </div>
          );
        case "color":
          return (
            <div className="flex flex-row">
              {product.color.map((item, index) => (
                <React.Fragment key={item}>
                  <p>{item},</p>
                  {index !== product.size.length - 1 && <p>&nbsp;</p>}
                </React.Fragment>
              ))}
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <ModalEditProduct product={editProduct(product.id)} />
              <Button
                isIconOnly
                isLoading={isLoading}
                size="sm"
                color="danger"
                variant="flat"
                onClick={() => {
                  mutate({
                    id: product.id,
                  });
                }}
              >
                <TrashIcon
                  size={15}
                  className={isLoading ? "hidden" : "inline-flex"}
                />
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

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

  const topContent = React.useMemo(() => {
    return (
      <div className="mt-2 flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
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
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalCreateProduct />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {newProducts.length} products
          </span>
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
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    newProducts.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex w-[30%] items-center gap-2">
          <span className=" whitespace-nowrap text-small text-default-400">
            {selectedKeys === "all"
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
          {deleteFilter.length > 0 && (
            <Button
              isIconOnly
              isLoading={loading}
              size="sm"
              color="danger"
              variant="flat"
              onClick={() => {
                const prduct = deleteFilter.map((item) => ({
                  id: item.id,
                }));
                deleteSelection(prduct);
              }}
            >
              <TrashIcon
                size={15}
                className={`${loading ? "invisible" : "visible"}`}
              />
            </Button>
          )}
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "start" : "center"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No product found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
