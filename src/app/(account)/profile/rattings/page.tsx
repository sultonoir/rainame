import TableRatingUser from "@/components/table/TableRatingUser";
import { api } from "@/trpc/server";
import React from "react";

const Page = async () => {
  const ratings = await api.rating.getRatingByUser.query();
  return <TableRatingUser ratings={ratings} />;
};

export default Page;
