import AdminNavbar from "@/components/templates/admin/admin-navbar";
import { AppSidebar } from "@/components/templates/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }

  if (user.role === "user") {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminNavbar />
        <div className="flex flex-col p-4">{children}</div>
      </SidebarInset>
      <Toaster richColors position="top-center" />
    </SidebarProvider>
  );
};

export default Layout;
