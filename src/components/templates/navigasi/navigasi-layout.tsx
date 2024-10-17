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
import { SearchInput } from "../search/search-input";

const NavigasiLayout = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  return (
    <NavigasiFloating className="top-2">
      <nav className="flex items-center justify-between rounded-t-lg border border-border/40 bg-background/95 px-2.5 py-2 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <Logo className="flex-shrink-0" />
        <div className="mx-2 max-w-[800px] flex-grow">
          <SearchInput />
        </div>
        <div className="hidden items-center space-x-2 md:flex">
          {!session ? (
            <>
              <ButtonSignin />
              <ButtonTheme />
            </>
          ) : (
            <>
              <ButtonTheme />
              <div>
                <ButtonNotification />
                <ButtonChat />
              </div>
              <Separator orientation="vertical" className="mr-4 h-8 w-1" />
              <UserButton />
            </>
          )}
        </div>
      </nav>
      <div className="w-full rounded-b-lg border border-t-0 border-border/40 p-2">
        {/* //Todo: add search bar */}
      </div>
    </NavigasiFloating>
  );
};

export default NavigasiLayout;
