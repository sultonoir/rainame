"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
  readmore?: boolean;
}

export const Preview = ({ value, readmore }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  return (
    <ReactQuill
      id="a"
      theme="bubble"
      value={value}
      readOnly
      className={`${readmore ? "h-[100px] overflow-hidden" : "h-full"}
      `}
    />
  );
};
