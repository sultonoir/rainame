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
import { Button } from "@nextui-org/react";
import { ThemeSwitcher } from "../shared/ThemeSwithcer";
import { signOut, useSession } from "next-auth/react";

export default function NavbarUi() {
  const { data: user } = useSession();

  return (
    <Navbar
      isBordered
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
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          {!user ? (
            <ModalAuth />
          ) : (
            <Button
              variant="solid"
              color="primary"
              size="sm"
              onPress={() => signOut()}
            >
              Logout
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
