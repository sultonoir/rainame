import DashboardBreadcrumb from "@/components/ui/dashboard-breadcrumb";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavigasiFloating } from "../navbar/navigasi-floating";

const AdminNavbar = () => {
  return (
    <NavigasiFloating className="backdrop-blur-lg">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DashboardBreadcrumb />
        </div>
      </header>
    </NavigasiFloating>
  );
};

export default AdminNavbar;
