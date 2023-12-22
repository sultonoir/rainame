"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  Avatar,
  Input,
  NavbarItem,
} from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import NotifyAdmin from "../notify/NotifyAdmin";
import { useSession } from "next-auth/react";
import { ThemeSwitcher } from "../shared/ThemeSwithcer";

export default function NavbarAdmin() {
  const { data } = useSession();
  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "pr-2 pl-0 max-w-full",
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
        <NavbarItem className="flex gap-2 border-r-2 border-default-300 px-2">
          <ThemeSwitcher />
          <NotifyAdmin />
        </NavbarItem>
        <Avatar
          isBordered
          className="transition-transform"
          color="primary"
          src={data?.user.image ?? ""}
          alt={data?.user.name ?? ""}
          size="sm"
        />
      </NavbarContent>
    </Navbar>
  );
}
