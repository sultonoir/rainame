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
    <div className="relative w-full lg:w-[240px]">
      <div className="sticky top-20 flex flex-col gap-5">
        <User
          className="justify-start pl-2"
          name={admin.user.name}
          avatarProps={{
            src: admin.user.image ?? "",
          }}
        />
        <ul className="flex w-full flex-col gap-1" aria-label="option">
          <li className="flex w-full flex-col gap-1 md:flex-row lg:flex-col">
            {option.map((item) => (
              <Button
                as="a"
                id={item.id}
                href={item.id}
                size="sm"
                fullWidth
                key={item.title}
                variant={active === item.id ? "flat" : "light"}
                color="primary"
                className="justify-start md:justify-center lg:justify-start"
              >
                {item.title}
              </Button>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AsideUser;
