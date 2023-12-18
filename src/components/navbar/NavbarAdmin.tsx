"use client";

import React from "react";
import { Navbar, NavbarContent, Avatar, Input } from "@nextui-org/react";

import { SearchIcon } from "lucide-react";
import { api } from "@/trpc/react";

export default function NavbarAdmin() {
  const { data } = api.admin.getAdmin.useQuery();
  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "max-w-[1800px] pr-2 pl-0",
      }}
    >
      <NavbarContent as="div" className="hidden w-full gap-4 sm:flex">
        <Input
          isClearable
          labelPlacement="outside"
          className="w-full"
          placeholder="Search"
          startContent={<SearchIcon />}
        />
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Avatar
          isBordered
          className="transition-transform"
          color="primary"
          src={data?.image ?? ""}
          alt={data?.name ?? ""}
          size="sm"
        />
      </NavbarContent>
    </Navbar>
  );
}
