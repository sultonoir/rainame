import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  about: string;
};

const Preview = dynamic(() => import("@/components/ui/preview"), {
  ssr: false,
  loading: () => (
    <Skeleton className="flex min-h-[300px] w-full items-center justify-center" />
  ),
});

const AboutProduct = ({ about }: Props) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">About product</h3>
      <Preview values={about} />
    </div>
  );
};

export default AboutProduct;
