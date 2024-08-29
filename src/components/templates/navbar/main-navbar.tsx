import React from "react";
import Logo from "./logo";
import { DemoNavbar } from "./demo-menu";
import LoginButton from "@/components/button/login-button";
import { SearchInput } from "@/components/input/search-input";

const MainNavbar = () => {
  return (
    <div className="container sticky top-2">
      <div className="rounded-lg border bg-background/50 p-2 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <DemoNavbar />
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
