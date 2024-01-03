import NavbarUi from "@/components/navbar/NavbarUi";
import React, { Suspense } from "react";
import Loading from "../loading";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarUi />
      <Suspense fallback={<Loading />}>
        <main className="container mt-2">{children}</main>
      </Suspense>
    </>
  );
};

export default layout;
