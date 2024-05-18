import MainNavbar from "@/components/navigasi/MainNavbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <MainNavbar />
      {children}
      <Footer/>
      <Toaster richColors />
    </React.Fragment>
  );
};

export default Layout;
