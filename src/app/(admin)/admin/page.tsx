import AuthAdmin from "@/components/authadmin/AuthAdmin";
import ModalCreateProduct from "@/components/modal/ModalCreateProduct";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

const page = async () => {
  const admin = await getServerAuthSession();
  return (
    <>
      {!admin ? (
        <>
          <AuthAdmin />
        </>
      ) : (
        <div className="container">
          <ModalCreateProduct />
        </div>
      )}
    </>
  );
};

export default page;
