import { Toaster } from "@/components/ui/sonner";
import { Fragment, type ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <div className="grid min-h-screen place-items-center p-4">{children}</div>
      <Toaster richColors position="top-center" />
    </Fragment>
  );
};

export default AuthLayout;
