import React from "react";
import { NavigasiFloating } from "./navigasi-floating";
import Logo from "@/components/ui/logo";
import ButtonSignin from "../button/button-signin";

const NavigasiLayout = () => {
  return (
    <NavigasiFloating className="top-2">
      <nav className="flex items-center justify-between rounded-lg border border-border/40 bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Logo />
        <ButtonSignin />
      </nav>
    </NavigasiFloating>
  );
};

export default NavigasiLayout;
