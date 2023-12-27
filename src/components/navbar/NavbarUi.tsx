"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import SearchInput from "./SearchInput";
import ModalAuth from "../modal/ModalAuth";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ThemeSwitcher } from "../shared/ThemeSwithcer";
import Profile from "../shared/Profile";
import NotifyUser from "../notify/NotifyUser";
import Cart from "../shared/Cart";

export default function NavbarUi() {
  const { data: user } = useSession();

  return (
    <Navbar
      classNames={{
        wrapper: "container mx-auto px-8 max-w-[1400px]",
      }}
    >
      <NavbarBrand>
        <Link href="/" className="font-bold text-foreground text-inherit">
          <Image
            src="/logo-transparent.png"
            alt="logo"
            width={40}
            height={40}
          />
          Rainame
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden grow gap-4 sm:flex" justify="center">
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem as="div" className="flex gap-2">
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          {!user ? (
            <ModalAuth />
          ) : (
            <NavbarItem as="div" className="flex items-center gap-2">
              <Cart />
              <NotifyUser />
              <Profile />
            </NavbarItem>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
