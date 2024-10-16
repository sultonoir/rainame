import NavigasiLayout from "@/components/templates/navigasi/navigasi-layout";
import AuthDialog from "@/components/ui/auth-dialog";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <NavigasiLayout />
      {children}
      <Toaster richColors position="top-center" />
      <AuthDialog />
    </React.Fragment>
  );
};

export default Layout;
