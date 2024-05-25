"use client";

import React from "react";
import FieldContact from "./FieldContact";
import FieldAddress from "./FieldAddress";
import FieldCardInfo from "./FieldCardInfo";

interface Props{
  id : string
}

const FormPayment = ({id}:Props) => {
  return (
    <div className="space-y-5 lg:w-[40%]">
      <FieldContact />
      <FieldAddress />
      <FieldCardInfo id={id} />
    </div>
  );
};

export default FormPayment;
