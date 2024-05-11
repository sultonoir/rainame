"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { type Session } from "next-auth";
import Link from "next/link";
import { LayoutDashboard, LogOut, Sliders } from "lucide-react";
import { profileMenu } from "@/dummy";

interface Props {
  data: Session | null;
}
const UserButton = ({ data }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar onMouseEnter={() => setIsOpen(!isOpen)}>
          <AvatarImage src={data?.user.image ?? ""} alt="@shadcn" />
          <AvatarFallback>
            {data?.user.email?.slice(0, 1).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        onMouseLeave={() => setIsOpen(!isOpen)}
      >
        <DropdownMenuLabel className="inline-flex space-x-2">
          <Avatar>
            <AvatarImage src={data?.user.image ?? ""} alt="@shadcn" />
            <AvatarFallback>
              {data?.user.email?.slice(0, 1).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="inline-flex flex-col items-start">
            <span className="text-small text-inherit">
              <p className="font-semibold capitalize">{data?.user.name}</p>
            </span>
            <span className="text-tiny text-muted-foreground">
              <p className="max-w-[150px] truncate">{data?.user.email}</p>
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.user.role === "admin" ? (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/dashboard"
                className="flex h-full w-full items-center gap-2"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 p-1">
                  <LayoutDashboard size={24} className="text-primary" />
                </span>
                Dashbord
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/admin/settings"
                className="flex h-full w-full items-center gap-2"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 p-1">
                  <Sliders size={24} className="text-primary" />
                </span>
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            {profileMenu.map((item) => (
              <DropdownMenuItem asChild key={item.title}>
                <Link
                  href={item.path}
                  className="flex h-full w-full items-center gap-2"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 p-1">
                    <item.icon size={24} className="text-primary" />
                  </span>
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            className="w-full cursor-pointer gap-2 border border-primary bg-primary text-white hover:bg-primary focus:bg-primary focus:text-white focus:hover:opacity-80 focus:hover:outline-none focus-visible:ring-0"
            onClick={() => signOut()}
          >
            <LogOut size={22} />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
