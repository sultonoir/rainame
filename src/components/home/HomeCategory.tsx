"use client";
import { Button, Link } from "@nextui-org/react";
import React from "react";

const HomeCategory = () => {
  return (
    <section className="my-10 flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">Category</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Button
          as={Link}
          href="/"
          className="flex h-auto w-full items-center justify-end rounded-xl bg-primary-200 p-2 duration-150 ease-in hover:-translate-y-1 hover:opacity-80"
        >
          <p className="rounded-lg bg-primary-300  px-2 py-1 text-lg text-foreground">
            Hat
          </p>
        </Button>
        <Button
          as={Link}
          href="/"
          className="flex h-auto w-full items-center justify-end rounded-xl bg-secondary-200 p-2 duration-150 ease-in hover:-translate-y-1 hover:opacity-80"
        >
          <p className="rounded-lg bg-secondary-300  px-2 py-1 text-lg text-foreground">
            Clothes
          </p>
        </Button>
        <Button
          as={Link}
          href="/"
          className="flex h-auto w-full items-center justify-end rounded-xl bg-danger-200 p-2 duration-150 ease-in hover:-translate-y-1 hover:opacity-80"
        >
          <p className="rounded-lg bg-danger-300  px-2 py-1 text-lg text-foreground">
            Pants
          </p>
        </Button>
        <Button
          as={Link}
          href="/"
          className="flex h-auto w-full items-center justify-end rounded-xl bg-success-200 p-2 duration-150 ease-in hover:-translate-y-1 hover:opacity-80"
        >
          <p className="rounded-lg bg-success-300  px-2 py-1 text-lg text-foreground">
            Shoes
          </p>
        </Button>
        <Button
          as={Link}
          href="/"
          className="flex h-auto w-full items-center justify-end rounded-xl bg-warning-200 p-2 duration-150 ease-in hover:-translate-y-1 hover:opacity-80"
        >
          <p className="rounded-lg bg-warning-300  px-2 py-1 text-lg text-foreground">
            Accessories
          </p>
        </Button>
      </div>
    </section>
  );
};

export default HomeCategory;
