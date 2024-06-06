import Image from "next/image";
import React from "react";

interface Props {
  title?: string;
  desc?: string;
}

const NotFound = ({
  title = "Product not found",
  desc = "We couldn't find the event with these search keywords, please pay attention to the spelling or search again, or with other filters.",
}: Props) => {
  return (
    <div className="flex size-full flex-col items-center space-y-5">
      <Image
        src="/errorimg.svg"
        alt="error"
        width={500}
        height={500}
        priority
      />
      <h1 className="text-center text-4xl font-semibold">{title}</h1>
      <h1 className="text-center text-xl font-semibold leading-6">{desc}</h1>
    </div>
  );
};

export default NotFound;
