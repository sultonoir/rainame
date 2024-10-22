import MainNavbar from "@/components/templates/navbar/main-navbar";
import { Toaster } from "@/components/ui/sonner";
import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainNavbar />
      <div className="relative z-0 min-h-screen">{children}</div>
      <Toaster richColors position="top-center" />
    </>
  );
};

export default AuthLayout;
