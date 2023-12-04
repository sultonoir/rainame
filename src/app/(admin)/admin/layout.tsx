import NavbarUi from "@/components/navbar/NavbarUi";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarUi />
      {children}
    </>
  );
};

export default layout;
