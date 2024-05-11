import React from "react";
import Header from "../Header";
import SidebarMobile from "./SidebarMobile";
import { Button } from "@/components/ui/button";
import { BellIcon, MessageSquareText } from "lucide-react";
import { getServerAuthSession } from "@/server/auth";
import UserButton from "../UserButton";

const AdminNavbar = async () => {
  const session = await getServerAuthSession();
  return (
    <Header>
      <div className="container flex items-center justify-between  lg:justify-end">
        <SidebarMobile />
        <div className="flex items-center gap-2">
          <Button size="icon" className="rounded-full" variant="ghost">
            <MessageSquareText />
          </Button>
          <Button size="icon" className="rounded-full" variant="ghost">
            <BellIcon />
          </Button>
          <UserButton data={session} />
        </div>
      </div>
    </Header>
  );
};

export default AdminNavbar;
