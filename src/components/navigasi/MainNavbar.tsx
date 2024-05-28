import React from "react";
import Header from "./Header";
import Logo from "./Logo";
import { getServerAuthSession } from "@/server/auth";
import DialogAuth from "../auth/DialogAuth";
import UserButton from "./UserButton";
import CartSheet from "../cart/CartSheet";
import { ThemeSwitcher } from "../theme/ThemeSwithcer";
import { Separator } from "../ui/separator";
import SearchBar from "../filter/SearchBar";
import SearbarMobile from "../filter/SearchBarMobile";
import { cn } from "@/lib/utils";
import UserNotifications from "../notifications/user/UserNotifications";

const MainNavbar = async () => {
  const session = await getServerAuthSession();
  return (
    <Header>
      <div className="container flex items-center justify-between">
        <Logo className="flex-shrink-0" />
        <SearbarMobile />
        <SearchBar />
        <div className="flex items-center">
          <div className={cn({ "mr-2": !session })}>
            <ThemeSwitcher />
          </div>
          {!session ? (
            <DialogAuth />
          ) : (
            <React.Fragment>
              <UserNotifications />
              <div className="lg:mr-4">
                <CartSheet />
              </div>
              <Separator
                orientation="vertical"
                className="hidden h-10 w-1 lg:block"
              />
              <div className="ml-4 hidden lg:block">
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
