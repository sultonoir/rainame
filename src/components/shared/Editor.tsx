"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

import "react-quill/dist/quill.snow.css";

interface PreviewProps {
  value: string;
  onChange: () => void;
}

const Editor = ({ value, onChange }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref}>
      <ReactQuill id="edit" theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default Editor;
