import React from "react";
import Logo from "./logo";
import { SearchInput } from "@/components/templates/input/search-input";
import { MenuNavbar } from "./menu-navabar";
import { ButtonProfile } from "../profile/button-profile";
import { ThemeButton } from "../button/theme-button";
import { NavigasiFloating } from "./navigasi-floating";

const MainNavbar = () => {
  return (
    <NavigasiFloating className="container top-2 max-w-[1400px]">
      <div className="rounded-lg border bg-background/50 p-2 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex-grow-1 flex items-center gap-2">
            <MenuNavbar />
          </div>
          <div className="flex items-center gap-2 sm:ml-2 sm:flex-grow lg:flex-grow-0">
            <SearchInput />
            <ThemeButton />
            <ButtonProfile />
          </div>
        </div>
      </div>
    </NavigasiFloating>
  );
};

export default MainNavbar;
