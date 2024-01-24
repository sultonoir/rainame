import { api } from "@/trpc/server";
import React from "react";

const Dashboard = async () => {
  const payments = await api.cart.getPayment.query();
  return <div className="grid gap-4 p-4 lg:grid-cols-5"></div>;
};

export default Dashboard;
