import { api } from "@/trpc/server";
import { cn } from "@nextui-org/react";
import React from "react";

const Dashboard = async () => {
  const data = await api.cart.getPayment.query();
  return (
    <div className="grid gap-4 p-4 2xl:grid-cols-5">
      <div className="col-span-1 flex w-full justify-between rounded-large border border-default bg-content1 p-4 2xl:col-span-2">
        <div className="flex w-full flex-col">
          <p className="text-2xl font-bold">${data.totalRevenueDaily}</p>
          <p>Daily revenue</p>
        </div>
        <div
          className={cn("flex items-center justify-center rounded-medium p-2", {
            "bg-success-50 text-success": data.growDaily > 0,
            "bg-danger-50 text-danger": data.growDaily < 0,
          })}
        >
          {data.growDaily.toFixed(2)}%
        </div>
      </div>
      <div className="col-span-1 flex w-full justify-between rounded-large border border-default bg-content1 p-4 2xl:col-span-2">
        <div className="flex w-full flex-col">
          <p className="text-2xl font-bold">${data.totalCurrentAnual}</p>
          <p>Annual revenue</p>
        </div>
        <div
          className={cn("flex items-center justify-center rounded-medium p-2", {
            "bg-success-50 text-success": data.growAnual > 0,
            "bg-danger-50 text-danger": data.growAnual < 0,
          })}
        >
          {data.growAnual.toFixed(2)}%
        </div>
      </div>
      <div className="col-span-1 flex w-full justify-between rounded-large border border-default bg-content1 p-4">
        <div className="flex w-full flex-col">
          <p className="text-2xl font-bold">{data.dataUserMonthly.length}</p>
          <p className="">new customers</p>
        </div>
        <div
          className={cn("flex items-center justify-center rounded-medium p-2", {
            "bg-success-50 text-success": data.growUser > 0,
            "bg-danger-50 text-danger": data.growUser < 0,
          })}
        >
          {data.growUser.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
