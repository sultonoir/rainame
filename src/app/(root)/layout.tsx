import MainNavbar from "@/components/templates/navbar/main-navbar";
import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
};

export default AuthLayout;
