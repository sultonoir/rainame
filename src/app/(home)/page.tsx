import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/admin");
  return <div>Home page</div>;
};

export default page;
