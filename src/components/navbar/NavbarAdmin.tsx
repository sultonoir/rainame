"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  Avatar,
  Input,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
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
          placeholder="Search by name..."
          startContent={<SearchIcon />}
        />
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={session?.user.name ?? ""}
              size="sm"
              src={session?.user.image ?? ""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection title="Profile" showDivider>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session?.user.email}</p>
              </DropdownItem>
            </DropdownSection>
            <DropdownItem href="/admin/settings" key="settings">
              My Settings
            </DropdownItem>
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
              onClick={async () => {
                await signOut({
                  redirect: true,
                  callbackUrl: "/admin",
                });
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
