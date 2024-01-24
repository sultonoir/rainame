"use client";

import { Link, cn } from "@nextui-org/react";
import {
  BadgeDollarSign,
  Banknote,
  BookIcon,
  FileText,
  LayoutDashboard,
  Mail,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

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

  const supports = [
    {
      title: "Message",
      path: "/admin",
      icons: Mail,
    },
    {
      title: "Invoice",
      path: "/admin",
      icons: FileText,
    },
  ];
  return (
    <aside className="absolute left-0 top-0 flex h-screen w-[270px] -translate-x-full flex-col overflow-y-hidden bg-gray-50 dark:bg-content1 lg:static lg:translate-x-0">
      <Link
        href="/admin"
        color="foreground"
        className="p-5 text-xl font-semibold lg:p-6"
      >
        <Image src="/logo-transparent.png" alt="logo" width={40} height={40} />
        Rainame
      </Link>
      <div className="flex flex-col overflow-y-auto scrollbar-hide">
        <nav className="px-4 py-4 lg:px-6">
          <h3 className="text-bodydark2 mb-4 ml-4 text-sm font-medium">Menu</h3>
          <ul className="mb-6 flex flex-col gap-1.5">
            {navadmin.map((item) => (
              <li key={item.path}>
                <a
                  color="foreground"
                  className={cn(
                    "group relative flex items-center gap-2.5 rounded-large  px-4 py-2 font-medium",
                    {
                      "bg-primary text-white": path === item.path,
                    },
                    {
                      "hover:bg-primary-100 hover:text-primary-500 dark:hover:text-white":
                        path !== item.path,
                    },
                  )}
                  href={item.path}
                >
                  <item.icons />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          <h3 className="text-bodydark2 mb-4 ml-4 text-sm font-medium">
            Support
          </h3>
          <ul className="mb-6 flex flex-col gap-1.5">
            {supports.map((item) => (
              <li key={item.path}>
                <a
                  color="foreground"
                  className={cn(
                    "group relative flex items-center gap-2.5 rounded-large  px-4 py-2 font-medium hover:bg-primary-100 hover:text-primary-500",
                  )}
                  href={item.path}
                >
                  <item.icons />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AsideAdmin;
