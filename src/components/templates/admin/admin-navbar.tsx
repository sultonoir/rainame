import DashboardBreadcrumb from "@/components/ui/dashboard-breadcrumb";
import React from "react";
import { ButtonProfile } from "../profile/button-profile";

const AdminNavbar = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <DashboardBreadcrumb />
      <ButtonProfile />
    </div>
  );
};

export default AdminNavbar;
