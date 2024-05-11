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
    <main className="flex min-h-screen w-full">
      <AsideAdmin />
      <section className="flex w-full flex-1 grow flex-col items-center px-6">
        <NavbarAdmin />
        {children}
      </section>
    </main>
  );
};

export default layout;
