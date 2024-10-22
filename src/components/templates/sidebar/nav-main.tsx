import {
  BellIcon,
  ChevronRight,
  Command,
  MessagesSquare,
  Package,
  Settings2,
  ShoppingCart,
  TicketPercent,
  User2,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Products",
    url: "/dashboard/product",
    icon: Package,
    isActive: true,
    items: [
      {
        title: "All Products",
        url: "/dashboard/products",
      },
      {
        title: "Create Product",
        url: "/dashboard/products/create-product",
      },
    ],
  },
  {
    title: "Customer",
    url: "/dashboard/customer",
    icon: User2,
    isActive: true,
    items: [
      {
        title: "Customers",
        url: "/dashboard/customer",
      },
      {
        title: "Rating",
        url: "/dashboard/customer/rating",
      },
      {
        title: "Complaint",
        url: "/dashboard/customer/complaint",
      },
    ],
  },
  {
    title: "Promo",
    url: "/dashboard/promo",
    icon: TicketPercent,
    isActive: true,
    items: [
      {
        title: "Promo",
        url: "/dashboard/promo",
      },
      {
        title: "Coupon",
        url: "/dashboard/coupon",
      },
    ],
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Apps</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip={"Dashboard"}>
            <Link href="/dashboard">
              <Command />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Notifications">
            <Link href="/notification">
              <BellIcon />
              <span>Notifications</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge>1</SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Chat">
            <Link href="/chat">
              <MessagesSquare />
              <span>Chats</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge>1</SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Order">
            <Link href="/order">
              <ShoppingCart />
              <span>Orders</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge>1</SidebarMenuBadge>
        </SidebarMenuItem>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Setting">
            <Link href="/dashboard/setting">
              <Settings2 />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
