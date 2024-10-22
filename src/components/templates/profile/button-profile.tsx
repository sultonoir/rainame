"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminMenulist, UserMenulist } from "@/lib/constants";
import { useSession } from "@/provider/session-provider";
import { MenuProfile } from "./menu-profile";
import React from "react";

export function ButtonProfile() {
  const { user } = useSession();
  const menulist = user?.role === "user" ? UserMenulist : AdminMenulist;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image ?? "/logo.png"} alt="@shadcn" />
            <AvatarFallback>{user?.name.at(0) ?? "R"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <MenuProfile menulists={menulist} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
