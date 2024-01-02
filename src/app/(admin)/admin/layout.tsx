import AuthAdmin from "@/components/authadmin/AuthAdmin";
import AsideAdmin from "@/components/navbar/AsideAdmin";
import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  if (!session) return <AuthAdmin />;
  if (session.user.role === "user") {
    redirect("/");
  }
  return (
    <main className="flex flex-row">
      <AsideAdmin />
      <section className="flex min-h-screen flex-1 flex-col items-center px-6">
        <NavbarAdmin />
        {children}
      </section>
    </main>
  );
};

export default layout;
