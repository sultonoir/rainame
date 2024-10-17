import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { type MenulistType } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { APIError } from "better-auth/api";
import { toast } from "sonner";

interface MenuProfileProps {
  menulists: MenulistType;
}

export const UserMenuDropdown = ({ menulists }: MenuProfileProps) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess() {
            router.refresh();
          },
        },
      });
    } catch (error) {
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    }
  };
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
      <DropdownMenuItem onClick={handleClick}>Signout</DropdownMenuItem>
    </React.Fragment>
  );
};
