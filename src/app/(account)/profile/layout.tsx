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
      <main className="container my-2 min-h-screen">
        <div className="flex flex-col gap-5 lg:flex-row">
          <AsideUser />
          {children}
        </div>
      </main>
    </>
  );
};

export default layout;
