import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Navbar />
      {children}
      <Suspense>
        <Footer />
      </Suspense>
      <Toaster
        richColors
        position="top-center"
      />
    </div>
  );
};

export default Layout;
