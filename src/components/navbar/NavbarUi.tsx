import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import SearchInput from "./SearchInput";

export default async function NavbarUi() {
  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "container mx-auto px-8 max-w-[1400px]",
      }}
    >
      <NavbarBrand>
        <p className="font-bold text-inherit">Rainame</p>
      </NavbarBrand>
      <NavbarContent className="hidden grow gap-4 sm:flex" justify="center">
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
