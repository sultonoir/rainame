import React from "react";
import { NavigasiFloating } from "./navigasi-floating";
import Logo from "@/components/ui/logo";
import ButtonSignin from "../button/button-signin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ButtonTheme } from "../button/button-theme";
import { UserButton } from "../user/user-button";
import ButtonNotification from "../button/button-notification";
import { ButtonChat } from "../button/button-chat";
import { Separator } from "@/components/ui/separator";

const NavigasiLayout = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  return (
    <NavigasiFloating className="top-2">
      <nav className="flex items-center justify-between rounded-lg border border-border/40 bg-background/95 px-2.5 py-2 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <Logo className="flex-shrink-0" />
        {!session ? (
          <div className="flex items-center gap-5">
            <ButtonTheme />
            <ButtonSignin />
          </div>
        ) : (
          <div className="flex items-center">
            <div className="">
              <ButtonNotification />
              <ButtonChat />
            </div>
            <Separator orientation="vertical" className="ml-2 mr-4 h-8 w-1" />
            <UserButton />
          </div>
        )}
      </nav>
    </NavigasiFloating>
  );
};

export default NavigasiLayout;
