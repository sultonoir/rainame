import { type MenuProfileProps } from "@/types";
import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignoutButton } from "../button/signout-button";

export const MenuProfile = ({ menulists }: MenuProfileProps) => {
  return (
    <React.Fragment>
      <DropdownMenuGroup>
        {menulists.map((item) => (
          <DropdownMenuItem asChild key={item.title}>
            <Link href={item.path} className="flex w-full justify-between">
              {item.title}
              <DropdownMenuShortcut>{item.keybind}</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuLabel asChild>
        <SignoutButton />
      </DropdownMenuLabel>
    </React.Fragment>
  );
};
