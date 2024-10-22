"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-6">
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/coupon/create-coupon">Create coupon</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
