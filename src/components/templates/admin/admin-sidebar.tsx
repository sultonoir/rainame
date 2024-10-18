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
  MessageSquareWarning,
  Package,
  Settings,
  ShoppingCart,
  TicketPercent,
  TicketsIcon,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { AdminSidebarMenu } from "./admin-sidebar-menu";
import { useIsCollapsed } from "@/hooks/use-is-collapsed";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/logo";
import ButtonCollapsed from "../button/button-collapsed";

const lists = [
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
  {
    title: "Coupon",
    path: "/dashboard/coupon",
    icon: TicketPercent,
    count: 0,
  },
  {
    title: "Promo",
    path: "/dashboard/promo",
    icon: TicketsIcon,
    count: 0,
  },
  {
    title: "Complain",
    path: "/dashboard/complain",
    icon: MessageSquareWarning,
    count: 0,
  },
];

const AdminSidebar = () => {
  const { isCollapsed } = useIsCollapsed();

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 flex w-full flex-col overflow-hidden bg-background transition-[height] duration-300 ease-in-out md:bottom-0 md:right-auto md:h-dvh`,
        {
          "h-0 md:w-64": !isCollapsed,
          "h-[670px] md:w-14": isCollapsed,
        },
      )}
    >
      <TooltipProvider>
        <nav className={cn("space-y-2 p-2", {})}>
          <Logo className="mb-4 hidden md:block" />
          <ButtonCollapsed className="block md:hidden" />
          {lists.map((item) => (
            <AdminSidebarMenu
              key={item.title}
              item={item}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
        <section className="mt-auto flex flex-col items-center gap-4 px-2 py-2 sm:py-5">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "relative flex h-9 w-full items-center space-x-4 rounded-lg px-2 text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <span className="flex-shrink-0">
                  <Settings size={20} />
                </span>

                <span
                  className={cn({
                    "block md:hidden": isCollapsed === true,
                    block: isCollapsed === false,
                  })}
                >
                  Settings
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className={cn("text-white", {
                "hidden md:block": isCollapsed,
                "md:hidden": !isCollapsed,
              })}
            >
              Settings
            </TooltipContent>
          </Tooltip>
        </section>
      </TooltipProvider>
    </aside>
  );
};

export default AdminSidebar;
