"use client";
import { Pagination } from "@nextui-org/react";
import { type Products, type Rattings } from "@prisma/client";
import React from "react";

type Props = {
  products: Array<
    Products & {
      rattings: Rattings[];
    }
  >;
};

const PaginationUi = ({ products }: Props) => {
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(products.length / 10);
  return (
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={page}
      total={pages}
      onChange={setPage}
    />
  );
};

export default PaginationUi;
