"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function NavbarAdmin() {
  const path = usePathname();
  const { data: session } = useSession();
  return (
    <Navbar
      isBordered
      classNames={{
        wrapper: "container mx-auto px-8 max-w-[1400px]",
      }}
    >
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarItem className="mr-3">
          <Link
            href="/admin"
            color="foreground"
            className="text-xl font-semibold"
          >
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            aria-current="page"
            color={path === "/admin/product" ? "primary" : "foreground"}
            href="/admin/product"
          >
            Product
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/admin/customers"
            aria-current="page"
            color={path === "/admin/customers" ? "primary" : "foreground"}
          >
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={path === "/admin/rattings" ? "primary" : "foreground"}
            href="/admin/rattings"
          >
            Rattings
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Rain"
              size="sm"
              src={session?.user.image ?? ""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session?.user.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              onClick={() => {
                console.log("hello world");
              }}
            >
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => {
                alert("memek");
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
