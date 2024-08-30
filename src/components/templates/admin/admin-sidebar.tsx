import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  MessageSquareText,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { type AdminMenuList } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AdminSidebar = () => {
  const lists: AdminMenuList[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
      count: 0,
    },
    {
      title: "Chats",
      path: "/dashboard/chats",
      icon: MessageSquareText,
      count: 0,
    },
    {
      title: "Orders",
      path: "/dashboard/orders",
      icon: ShoppingCart,
      count: 0,
    },
    {
      title: "Products",
      path: "/dashboard/products",
      icon: Package,
      count: 0,
    },
    {
      title: "Customers",
      path: "/dashboard/customers",
      icon: Users2,
      count: 0,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link href="/" className="">
            <Image src="/logo.png" alt="logo" height={32} width={32} priority />
          </Link>
          {lists.map((item) => (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <Link
                  href={item.path}
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <item.icon className="h-5 w-5" />
                  <div
                    className={cn(
                      "absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-foreground",
                      {
                        hidden: !item.count && item.count! < 1,
                      },
                    )}
                  >
                    {item.count}
                  </div>
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
};

export default AdminSidebar;
