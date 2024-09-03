import React from "react";
import Logo from "./logo";
import LoginButton from "@/components/templates/button/login-button";
import { SearchInput } from "@/components/templates/input/search-input";
import { MenuNavbar } from "./menu-navabar";

const MainNavbar = () => {
  return (
    <div className="container sticky top-2">
      <div className="rounded-lg border bg-background/50 p-2 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <MenuNavbar />
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <SearchInput />
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
