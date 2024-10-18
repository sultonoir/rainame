import React from "react";
import { ButtonTheme } from "../button/button-theme";
import { UserButton } from "../user/user-button";
import { NavigasiFloating } from "../navigasi/navigasi-floating";
import ButtonCollapsed from "../button/button-collapsed";
import { Separator } from "@/components/ui/separator";
import ButtonNotification from "../button/button-notification";

export function AdminNavbar() {
  return (
    <NavigasiFloating className="w-full max-w-[2000px] px-0">
      <nav className="flex w-full items-center justify-between rounded-t-lg bg-background/95 px-2.5 py-2 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <ButtonCollapsed />
        <div className="flex items-center space-x-2">
          <ButtonTheme />
          <ButtonNotification />
          <Separator orientation="vertical" className="mr-4 h-8 w-1" />
          <UserButton />
        </div>
      </nav>
    </NavigasiFloating>
  );
}
