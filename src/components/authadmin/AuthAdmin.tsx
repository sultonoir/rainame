"use client";
import React from "react";
import NextImage from "next/image";
const AuthAdmin = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2">
      <NextImage alt="Logo" src="Logo.png" width={100} height={100} />
    </div>
  );
};

export default AuthAdmin;
