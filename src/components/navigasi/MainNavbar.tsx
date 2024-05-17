import React from "react";
import Header from "./Header";
import Logo from "./Logo";
import { getServerAuthSession } from "@/server/auth";
import DialogAuth from "../auth/DialogAuth";
import UserButton from "./UserButton";
import CartSheet from "../cart/CartSheet";
import { ThemeSwitcher } from "../theme/ThemeSwithcer";
import { Separator } from "../ui/separator";

const MainNavbar = async () => {
  const session = await getServerAuthSession();
  return (
    <Header>
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center">
          <ThemeSwitcher />
          {!session ? (
            <DialogAuth />
          ) : (
            <React.Fragment>
              <div className="mr-4">
                <CartSheet />
              </div>
              <Separator orientation="vertical" className="h-10 w-1" />
              <div className="ml-4">
                <UserButton data={session} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Header>
  );
};

export default MainNavbar;
