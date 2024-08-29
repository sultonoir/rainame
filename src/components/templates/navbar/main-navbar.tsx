import React from "react";
import Logo from "./logo";

const MainNavbar = () => {
  return (
    <div className="sticky top-2 mx-4 rounded-full border bg-background/50 p-2 backdrop-blur-lg">
      <Logo />
    </div>
  );
};

export default MainNavbar;
