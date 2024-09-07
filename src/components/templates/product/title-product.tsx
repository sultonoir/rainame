import { type Rating } from "@prisma/client";
import React from "react";

type Props = {
  title: string;
  rating: Rating[];
};

const TitleProduct = (props: Props) => {
  return (
    <div className="flex gap-2">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        {props.title}
      </h3>
    </div>
  );
};

export default TitleProduct;
