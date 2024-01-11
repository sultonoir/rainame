import TableOrderUser from "@/components/table/TableOrderUser";
import { api } from "@/trpc/server";
import React from "react";

const Page = async () => {
  const payments = await api.cart.getPaymentByUser.query();
  return <TableOrderUser payments={payments} />;
};

export default Page;
