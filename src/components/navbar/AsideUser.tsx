"use client";
import { Button, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const AsideUser = () => {
  const { data: admin } = useSession();
  if (!admin) redirect("/");

  const option = [
    {
      title: "Profile",
      id: "/profile",
    },
    {
      title: "Order",
      id: "/profile/order",
    },
    {
      title: "Ratings",
      id: "/profile/rattings",
    },
    {
      title: "Password",
      id: "/profile/password",
    },
  ];

  const active = usePathname();
  return (
    <div className="sticky top-0 flex flex-col gap-5">
      <User
        className="justify-start pl-2"
        name={admin.user.name}
        avatarProps={{
          src: admin.user.image ?? "",
        }}
      />
      <ul className="flex w-fit flex-col gap-1" aria-label="option">
        {option.map((item) => (
          <Button
            as="li"
            id={item.id}
            size="sm"
            key={item.title}
            variant={active === item.id ? "flat" : "light"}
            color="primary"
            className="relative w-[240px] justify-start"
          >
            {item.title}
            <a href={item.id} className="absolute inset-0"></a>
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default AsideUser;
