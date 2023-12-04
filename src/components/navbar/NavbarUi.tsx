import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import SearchInput from "./SearchInput";
import { getServerAuthSession } from "@/server/auth";
import ModalAuth from "../modal/ModalAuth";
import { Link } from "@nextui-org/link";

export default async function NavbarUi() {
  const session = await getServerAuthSession();
  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "container mx-auto px-8 max-w-[1400px]",
      }}
    >
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit text-primary">
          Rainame
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden grow gap-4 sm:flex" justify="center">
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {!session ? <ModalAuth /> : null}
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
