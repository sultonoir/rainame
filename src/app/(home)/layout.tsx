import NavbarUi from "@/components/navbar/NavbarUi";
import React, { Suspense } from "react";
import Loading from "../loading";
import Footer from "@/components/shared/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarUi />
      <Suspense fallback={<Loading />}>
        <main className="container my-2">{children}</main>
        <Footer />
      </Suspense>
    </>
  );
};

export default layout;
