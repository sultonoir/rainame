"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Home,
  MessageSquareHeart,
  MessageSquareTextIcon,
  NotepadText,
  Package2,
  TicketPercent,
} from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AdminThemeButton from "@/components/theme/AdminThemeButton";

const SidebarItem = () => {
  const path = usePathname();

  const sideLists = [
    {
      name: "App",
      services: [
        {
          title: "Home",
          pathname: "/admin/dashboard",
          icon: Home,
          subservice: null,
        },
        {
          title: "Chats",
          pathname: "/admin/chats",
          icon: MessageSquareTextIcon,
          subservice: null,
        },
        {
          title: "Product",
          pathname: "",
          icon: Package2,
          subservice: [
            {
              title: "Create product",
              pathname: "/admin/create-product",
            },
            {
              title: "Product list",
              pathname: "/admin/product-list",
            },
          ],
        },
        {
          title: "Promo",
          pathname: "/admin/promo",
          icon: TicketPercent,
          subservice: null,
        },
      ],
    },
    {
      name: "Customer",
      services: [
        {
          title: "Order",
          pathname: "/admin/order",
          icon: NotepadText,
          subservice: null,
        },
        {
          title: "Feedback",
          pathname: "",
          icon: MessageSquareHeart,
          subservice: [
            {
              title: "Ratings",
              pathname: "/admin/ratings",
            },
            {
              title: "Complain",
              pathname: "/admin/complain",
            },
          ],
        },
        {
          title: "Customer list",
          pathname: "/admin/customer",
          icon: MessageSquareTextIcon,
          subservice: null,
        },
      ],
    },
  ];

  return (
    <div className="flex size-full flex-col justify-between">
      <div className="flex size-full flex-col gap-1">
        <Link href="/" className="inline-flex items-center px-2 pb-8">
          <Image
            src="/logo.png"
            alt="logo"
            width={48}
            height={48}
            priority
            loading="eager"
          />
          <span className="text-lg font-medium">Rainame</span>
        </Link>
        {sideLists.map((list) => (
          <React.Fragment key={list.name}>
            <p className="text-sm font-semibold">APPS</p>
            {list.services.map((service) => (
              <React.Fragment key={service.title}>
                {!service.subservice ? (
                  <Link
                    href={service.pathname}
                    className={cn(
                      buttonVariants({
                        variant:
                          path === service.pathname ? "default" : "ghost",
                        className:
                          "items-center justify-start gap-2 leading-normal text-muted-foreground",
                        size: "sm",
                      }),
                      { "text-white": path === service.pathname },
                    )}
                  >
                    <service.icon size={20} />
                    {service.title}
                  </Link>
                ) : (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="h-9 rounded-lg px-3 py-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                        <div className="flex items-center gap-2">
                          <service.icon size={20} />
                          {service.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="mt-1 flex flex-col gap-1 p-0">
                        {service.subservice.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.pathname}
                            className={cn(
                              buttonVariants({
                                size: "sm",
                                variant:
                                  path === sub.pathname ? "default" : "ghost",
                                className:
                                  "ml-9 justify-start text-muted-foreground",
                              }),
                              { "text-white": path === sub.pathname },
                            )}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
      <AdminThemeButton />
    </div>
  );
};

export default SidebarItem;
