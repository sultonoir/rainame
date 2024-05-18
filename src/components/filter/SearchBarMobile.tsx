"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogClose,
} from "@/components/ui/dialog";
import { ArrowLeft, HistoryIcon, Search, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import useSearch from "@/hook/useSearch";
import useStore from "@/hook/useStore";
import Link from "next/link";
import { navigate } from "@/lib/navigate";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const SearbarMobile = () => {
  const [open, setOpen] = useState(false);
  const { removeItem, setSearchList } = useSearch();
  const [value, setValue] = useState("");
  const searchLists = useStore(useSearch, (value) => value.searchLists);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          startContent={<Search size={20} />}
          className="mr-2 w-full justify-start gap-2 text-muted-foreground lg:hidden"
        >
          Search...
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-dvh max-w-full flex-col gap-2">
        <DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              navigate(`/product/?title=${value}`);
              setSearchList(value);
            }}
            className="flex h-fit flex-row items-center gap-2 space-y-0"
          >
            <DialogClose className="flex items-center justify-center">
              <ArrowLeft size={20} />
            </DialogClose>
            <Input
              placeholder="search..."
              className="border-none outline-none ring-0 focus:ring-0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {searchLists?.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-lg px-2 py-1 text-muted-foreground hover:bg-secondary"
            >
              <span className="size-5 flex-shrink-0">
                <HistoryIcon size={20} />
              </span>
              <Link
                href={{
                  pathname: "/product",
                  query: { title: item },
                }}
                className="flex-1"
              >
                {item}
              </Link>
              <button
                type="button"
                className="z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item);
                }}
              >
                <XIcon size={20} />
              </button>
            </li>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearbarMobile;
