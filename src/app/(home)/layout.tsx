import NavbarUi from "@/components/navbar/NavbarUi";
import React from "react";
import Footer from "@/components/shared/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarUi />
      {children}
      <Footer />
    </>
  );
};

export default layout;
