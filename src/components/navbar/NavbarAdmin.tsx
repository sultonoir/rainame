"use client";

import React from "react";
import { Navbar, NavbarContent, Avatar, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { SearchIcon } from "lucide-react";

export default function NavbarAdmin() {
  const { data: session } = useSession();
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
          name={session?.user.name ?? ""}
          size="sm"
          src={session?.user.image ?? ""}
        />
      </NavbarContent>
    </Navbar>
  );
}
