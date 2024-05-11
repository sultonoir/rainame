import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center px-2">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
