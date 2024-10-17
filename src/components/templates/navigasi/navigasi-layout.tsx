import React from "react";
import { NavigasiFloating } from "./navigasi-floating";
import Logo from "@/components/ui/logo";
import ButtonSignin from "../button/button-signin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ButtonSignout from "../button/button-signout";

const NavigasiLayout = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  return (
    <NavigasiFloating className="top-2">
      <nav className="flex items-center justify-between rounded-lg border border-border/40 bg-background/95 p-2 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
        <Logo />
        {!session ? <ButtonSignin /> : <ButtonSignout />}
      </nav>
    </NavigasiFloating>
  );
};

export default NavigasiLayout;
