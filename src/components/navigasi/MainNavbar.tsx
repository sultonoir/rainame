import React from "react";
import Header from "./Header";
import Logo from "./Logo";
import { getServerAuthSession } from "@/server/auth";
import DialogAuth from "../auth/DialogAuth";
import UserButton from "./UserButton";

const MainNavbar = async () => {
  const session = await getServerAuthSession();
  return (
    <Header>
      <div className="container flex items-center justify-between">
        <Logo />
        {!session ? <DialogAuth /> : <UserButton data={session} />}
      </div>
    </Header>
  );
};

export default MainNavbar;
