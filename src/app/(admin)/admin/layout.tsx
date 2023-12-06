import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarAdmin />
      {children}
    </>
  );
};

export default layout;
