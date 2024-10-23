import CartContent from "@/components/templates/cart/cart-content";
import MainNavbar from "@/components/templates/navbar/main-navbar";
import { Toaster } from "@/components/ui/sonner";
import { Fragment, type ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainNavbar />
      <div className="relative z-0 min-h-screen">{children}</div>
      <Toaster richColors position="top-center" />
      <CartContent />
    </Fragment>
  );
};

export default AuthLayout;
