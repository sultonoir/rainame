"use client";
import { useSession } from "next-auth/react";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

import { signOut } from "next-auth/react";

const Profile = () => {
  const { data: user } = useSession();
  return (
    <Dropdown placement="bottom">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          size="sm"
          color="primary"
          className="transition-transform"
          src={user?.user.image ?? ""}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          className="h-14 gap-2"
          href={`/${user?.user.name}`}
        >
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.user.email}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Profile;
