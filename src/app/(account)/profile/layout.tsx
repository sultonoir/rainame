import AsideUser from "@/components/navbar/AsideUser";
import NavbarUi from "@/components/navbar/NavbarUi";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Profile - Rainame",
  description: "Your personal fashion",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <NavbarUi />
      <main className="container relative my-5 flex min-h-screen w-full flex-col gap-5 sm:flex-row">
        <AsideUser />
        {children}
      </main>
    </>
  );
};

export default layout;
