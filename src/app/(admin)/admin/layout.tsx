import AuthAdmin from "@/components/authadmin/AuthAdmin";
import AsideAdmin from "@/components/navbar/AsideAdmin";
import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  if (!session) return <AuthAdmin />;
  return (
    <main className="flex">
      <AsideAdmin />
      <section className="flex grow flex-col gap-3 px-5">
        <NavbarAdmin />
        {children}
      </section>
    </main>
  );
};

export default layout;
