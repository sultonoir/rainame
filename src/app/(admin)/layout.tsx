import AdminNavbar from "@/components/navigasi/admin/AdminNavbar";
import Sidebar from "@/components/navigasi/admin/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-1">
        <AdminNavbar />
        {children}
        <Toaster position="bottom-left" richColors />
      </div>
    </div>
  );
};

export default Layout;
