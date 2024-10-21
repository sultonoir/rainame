import MainNavbar from "@/components/templates/navbar/main-navbar";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainNavbar />
      {children}
      <Toaster richColors position="top-center" />
    </>
  );
};

export default AuthLayout;
