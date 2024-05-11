import MainNavbar from "@/components/navigasi/MainNavbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <MainNavbar />
      {children}
      <Toaster />
    </React.Fragment>
  );
};

export default Layout;
