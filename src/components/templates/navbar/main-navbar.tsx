import React from "react";
import Logo from "./logo";
import { SearchInput } from "@/components/templates/input/search-input";
import { MenuNavbar } from "./menu-navabar";
import { ButtonProfile } from "../profile/button-profile";
import { ThemeButton } from "../button/theme-button";
import { NavigasiFloating } from "./navigasi-floating";
import CartButton from "../cart/cart-button";
import { validateRequest } from "@/lib/auth/validate-request";
import LoginButton from "../button/login-button";
import { MenuNavbarMobile } from "./menu-navbar-mobile";

const MainNavbar = async () => {
  const { user } = await validateRequest();
  return (
    <NavigasiFloating className="container top-2 z-50 max-w-[1400px]">
      <div className="flex flex-col space-y-2 rounded-lg border bg-background/50 p-2 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          <div className="mx-2 flex flex-grow items-center gap-2 md:mx-10">
            <SearchInput />
          </div>
          <div className="flex flex-grow-0 items-center gap-2 sm:ml-2">
            <ThemeButton />
            {!user ? (
              <LoginButton />
            ) : (
              <div className="hidden items-center space-x-2 md:flex">
                <CartButton />
                <ButtonProfile />
              </div>
            )}
          </div>
        </div>
        <MenuNavbar className="hidden sm:flex" />
        <MenuNavbarMobile className="flex sm:hidden" />
      </div>
    </NavigasiFloating>
  );
};

export default MainNavbar;
