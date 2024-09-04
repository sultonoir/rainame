import React from "react";
import Logo from "./logo";
import { SearchInput } from "@/components/templates/input/search-input";
import { MenuNavbar } from "./menu-navabar";
import { ButtonProfile } from "../profile/button-profile";

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
            <ButtonProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
