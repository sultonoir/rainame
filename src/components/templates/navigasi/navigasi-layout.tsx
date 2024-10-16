import React from "react";
import { NavigasiFloating } from "./navigasi-floating";
import Logo from "@/components/ui/logo";
import ButtonSignin from "../button/button-signin";

const NavigasiLayout = () => {
  return (
    <NavigasiFloating>
      <nav className="flex items-center justify-between">
        <Logo />
        <ButtonSignin />
      </nav>
    </NavigasiFloating>
  );
};

export default NavigasiLayout;
