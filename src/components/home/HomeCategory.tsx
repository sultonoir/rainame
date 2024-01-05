"use client";

import { Button, Link, cn } from "@nextui-org/react";
import React from "react";

const HomeCategory = () => {
  const category = [
    {
      name: "Hat",
      path: "/product?subcategory=Hat",
      color: "bg-primary-200",
      secondary: "bg-primary-300",
    },
    {
      name: "Clothes",
      path: "/product?subcategory=Clothes",
      color: "bg-secondary-200",
      secondary: "bg-secondary-300",
    },
    {
      name: "Pants",
      path: "product?subcategory=Pants",
      color: "bg-danger-200",
      secondary: "bg-danger-300",
    },
    {
      name: "Shoes",
      path: "/product?subcategory=Shoes",
      color: "bg-success-200",
      secondary: "bg-success-300",
    },
    {
      name: "Accessories",
      path: "/product?subcategory=Accessories",
      color: "bg-warning-200",
      secondary: "bg-warning-300",
    },
  ];
  return (
    <section className="flex flex-col gap-5 lg:items-center">
      <div className="flex justify-center">
        <p className="text-2xl font-semibold capitalize">
          what you are looking for
        </p>
      </div>
      <div className="flex flex-row gap-4 overflow-auto p-4 sm:justify-between lg:grid lg:grid-cols-5">
        {category.map((item) => (
          <Button
            key={item.name}
            as={Link}
            href={item.path}
            className={cn(
              "block h-auto w-fit min-w-fit items-center justify-end rounded-xl p-2 duration-150 ease-in hover:-translate-y-1 hover:opacity-80 sm:w-full lg:flex ",
              item.color,
            )}
          >
            <p
              className={cn(
                "rounded-lg px-2 py-1 text-lg text-foreground",
                item.secondary,
              )}
            >
              {item.name}
            </p>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default HomeCategory;
