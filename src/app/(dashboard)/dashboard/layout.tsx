"use client";

import { AdminNavbar } from "@/components/templates/admin/admin-navbar";
import AdminSidebar from "@/components/templates/admin/admin-sidebar";
import { useIsCollapsed } from "@/hooks/use-is-collapsed";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useIsCollapsed();
  return (
    <div className="relative max-w-[2000px]">
      <AdminSidebar />
      <div
        className={`relative overflow-x-hidden pt-2 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        <AdminNavbar />
        <div className="container min-h-screen rounded-2xl bg-accent p-4 dark:bg-accent/50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
