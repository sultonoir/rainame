import NavbarUi from "@/components/navbar/NavbarUi";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarUi />
      <main className="container mt-2">{children}</main>
    </>
  );
};

export default layout;
