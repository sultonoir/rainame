import AdminNavbar from "@/components/templates/admin/admin-navbar";
import AdminSidebar from "@/components/templates/admin/admin-sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="maxw flex min-h-screen w-full flex-col">
      <AdminSidebar />
      <div className="container flex size-full min-h-screen flex-col sm:gap-4 sm:py-4 sm:pl-20">
        <AdminNavbar />
        {children}
        <Toaster richColors position="bottom-left" closeButton />
      </div>
    </div>
  );
};

export default Layout;
