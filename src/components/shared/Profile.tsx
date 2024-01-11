"use client";
import { useSession } from "next-auth/react";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar,
  User,
} from "@nextui-org/react";

import { signOut } from "next-auth/react";
import { HeartIcon, LogOut, ScrollText, UserIcon } from "lucide-react";

const Profile = () => {
  const lists = [
    {
      title: "My profile",
      path: "/profile",
      icons: UserIcon,
    },
    {
      title: "My order",
      path: "/profile/order",
      icons: ScrollText,
    },
    {
      title: "Wishlist",
      path: "/profile/order",
      icons: HeartIcon,
    },
  ];
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
        <DropdownSection showDivider>
          <DropdownItem key="profile" className="h-14 gap-2" href={`/profile`}>
            <User
              name={
                <p className="font-semibold capitalize">{user?.user.name}</p>
              }
              description={
                <p className="max-w-[180px] truncate">{user?.user.email}</p>
              }
              avatarProps={{
                src: user?.user.image ?? "",
              }}
            />
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          {lists.map((item) => (
            <DropdownItem
              as="a"
              href={item.path}
              key={item.title}
              startContent={<item.icons />}
            >
              {item.title}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownItem
          key="logout"
          color="danger"
          startContent={<LogOut />}
          onPress={() => signOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Profile;
