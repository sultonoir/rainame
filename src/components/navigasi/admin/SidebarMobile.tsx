"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  CircleUserRound,
  FileText,
  Home,
  MessageSquareHeart,
  MessageSquareTextIcon,
  NotepadText,
  Package2,
  TicketPercent,
  MenuIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AdminThemeButton from "@/components/theme/AdminThemeButton";

const SidebarMobile = () => {
  const [open, setOpen] = React.useState(false);
  const path = usePathname();

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "icon",
            className: "lg:hidden",
          }),
        )}
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex size-full flex-col justify-between">
          <div className="flex size-full flex-col gap-1">
            <Link
              onClick={handleClick}
              href="/"
              className="inline-flex items-center px-2 pb-8"
            >
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
            <p className="text-sm font-semibold">APPS</p>
            <Link
              onClick={handleClick}
              href="/admin/dashboard"
              className={cn(
                buttonVariants({
                  variant: path === "/admin/dashboard" ? "default" : "ghost",
                  className: "justify-start gap-2 text-muted-foreground",
                }),
                { "text-white": path === "/admin/dashboard" },
              )}
            >
              <Home />
              Dashboard
            </Link>
            <Link
              onClick={handleClick}
              href="/admin/chats"
              className={cn(
                buttonVariants({
                  variant: path === "/admin/chats" ? "default" : "ghost",
                  className: "justify-start gap-2 text-muted-foreground",
                }),
                { "text-white": path === "/admin/chats" },
              )}
            >
              <MessageSquareTextIcon />
              Chats
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="h-10 rounded-lg px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <div className="flex gap-2">
                    <Package2 />
                    Product
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 p-0 pt-1">
                  <Link
                    onClick={handleClick}
                    href="/admin/create-product"
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant:
                          path === "/admin/create-product"
                            ? "default"
                            : "ghost",
                        className: "ml-9 justify-start text-muted-foreground",
                      }),
                      { "text-white": path === "/admin/create-product" },
                    )}
                  >
                    Create product
                  </Link>
                  <Link
                    onClick={handleClick}
                    href="/admin/product-list"
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant:
                          path === "/admin/product-list" ? "default" : "ghost",
                        className: "ml-9 justify-start text-muted-foreground",
                      }),
                      { "text-white": path === "/admin/product-list" },
                    )}
                  >
                    Product list
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              onClick={handleClick}
              href="/admin/forms"
              className={cn(
                buttonVariants({
                  variant: path === "/admin/forms" ? "default" : "ghost",
                  className: "justify-start gap-2 text-muted-foreground",
                }),
                { "text-white": path === "/admin/forms" },
              )}
            >
              <FileText />
              Forms
            </Link>
            <p className="my-2 text-sm font-semibold">CUSTOMER</p>
            <Link
              onClick={handleClick}
              href="/admin/order"
              className={cn(
                buttonVariants({
                  variant: path === "/admin/order" ? "default" : "ghost",
                  className: "justify-start gap-2 text-muted-foreground",
                }),
                { "text-white": path === "/admin/order" },
              )}
            >
              <NotepadText />
              Order
            </Link>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="h-10 rounded-lg px-4 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <div className="flex gap-2">
                    <MessageSquareHeart />
                    Feedback
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1 p-0 pt-1">
                  <Link
                    onClick={handleClick}
                    href="/admin/ratings"
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant:
                          path === "/admin/ratings" ? "default" : "ghost",
                        className: "ml-9 justify-start text-muted-foreground",
                      }),
                      { "text-white": path === "/admin/ratings" },
                    )}
                  >
                    Ratings
                  </Link>
                  <Link
                    onClick={handleClick}
                    href="/admin/product-list"
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant:
                          path === "/admin/product-list" ? "default" : "ghost",
                        className: "ml-9 justify-start text-muted-foreground",
                      }),
                      { "text-white": path === "/admin/product-list" },
                    )}
                  >
                    Complain
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              onClick={handleClick}
              href="/admin/customer"
              className={cn(
                buttonVariants({
                  variant: path === "/admin/customer" ? "default" : "ghost",
                  className: "justify-start gap-2 text-muted-foreground",
                }),
                { "text-white": path === "admin/customer" },
              )}
            >
              <CircleUserRound />
              Customer list
            </Link>
            <Link
              onClick={handleClick}
              href="/admin/promo"
              className={cn(
                buttonVariants({
                  variant: path === "/admin/promo" ? "default" : "ghost",
                  className: "justify-start gap-2 pb-3 text-muted-foreground",
                }),
                { "text-white": path === "admin/promo" },
              )}
            >
              <TicketPercent />
              Promo list
            </Link>
          </div>
          <AdminThemeButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
