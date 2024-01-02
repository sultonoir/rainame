"use client";

import { Link } from "@nextui-org/react";
import {
  BadgeDollarSign,
  Banknote,
  BookIcon,
  LayoutDashboard,
  LogOut,
  SlidersHorizontal,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";

const AsideAdmin = () => {
  const path = usePathname();
  const navadmin = [
    {
      title: "Dashboard",
      path: "/admin",
      icons: LayoutDashboard,
    },
    {
      title: "Products",
      path: "/admin/product",
      icons: BookIcon,
    },
    {
      title: "Payments",
      path: "/admin/payments",
      icons: Banknote,
    },
    {
      title: "Rattings",
      path: "/admin/rattings",
      icons: StarIcon,
    },
    {
      title: "Promo",
      path: "/admin/promo",
      icons: BadgeDollarSign,
    },
  ];
  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/admin",
    });
  };
  return (
    <aside className="sticky left-0 top-0 z-20 flex  h-[100dvh] w-fit flex-col bg-content1 px-5 pt-2">
      <nav className="flex w-full flex-col gap-2">
        <Link
          href="/admin"
          color="foreground"
          className="mb-10 text-xl font-semibold"
        >
          <Image
            src="/logo-transparent.png"
            alt="logo"
            width={40}
            height={40}
          />
          Rainame
        </Link>
        <p className="text-small text-default-400">OVERVIEW</p>
        <ul className="flex h-full w-full grow flex-col gap-8">
          {navadmin.map((item) => (
            <li key={item.path}>
              <Link color="foreground" className="flex gap-2" href={item.path}>
                <item.icons
                  className={`${path === item.path ? "text-primary" : ""}`}
                />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="mb-2 mt-auto">
        <p className="mb-2 text-small text-default-400">SETTINGS</p>
        <div className="flex flex-col gap-4">
          <Link
            color="foreground"
            className="flex gap-2"
            href="/admin/settings"
          >
            <SlidersHorizontal
              className={path === "/admin/settings" ? "text-primary" : ""}
            />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex gap-2 text-danger hover:opacity-80"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </section>
    </aside>
  );
};

export default AsideAdmin;
