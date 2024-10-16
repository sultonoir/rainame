import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      {children}
      <Toaster richColors position="top-center" />
    </React.Fragment>
  );
};

export default Layout;
