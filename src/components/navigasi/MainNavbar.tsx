import React from "react";
import Header from "./Header";
import Logo from "./Logo";
import { getServerAuthSession } from "@/server/auth";
import DialogAuth from "../auth/DialogAuth";
import UserButton from "./UserButton";
import CartSheet from "../cart/CartSheet";
import { ThemeSwitcher } from "../theme/ThemeSwithcer";

const MainNavbar = async () => {
  const session = await getServerAuthSession();
  return (
    <Header>
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {!session ? (
            <DialogAuth />
          ) : (
            <React.Fragment>
              <CartSheet />
              <UserButton data={session} />
            </React.Fragment>
          )}
        </div>
      </div>
    </Header>
  );
};

export default MainNavbar;
