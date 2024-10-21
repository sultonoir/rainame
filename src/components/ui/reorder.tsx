"use client";

import { Reorder } from "framer-motion";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";

export function ReorderTest() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uniqueNewFiles = acceptedFiles.filter(
        (file) =>
          !files.some((existingFile) => existingFile.name === file.name),
      );
      setFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      const result = await startUpload(files);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <Input type="file" className="hidden" {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>
      <h4 className="text-lg font-semibold">Files List (Drag to Reorder)</h4>
      <Reorder.Group
        axis="y"
        values={files}
        onReorder={setFiles}
        className="flex max-h-[500px] flex-col space-y-2 overflow-auto"
      >
        {files.map((file) => (
          <Reorder.Item
            key={file.name}
            value={file}
            className="flex cursor-move items-center space-x-2 rounded-lg bg-secondary p-2"
          >
            <div className="relative size-12 overflow-hidden rounded lg:size-20">
              <Image
                alt={file.name}
                src={URL.createObjectURL(file)}
                fill
                className="object-cover"
              />
            </div>
            <span className="flex-grow truncate">{file.name}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setFiles((files) => files.filter((f) => f !== file))
              }
            >
              <X className="h-4 w-4" />
            </Button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <Button disabled={isLoading} onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}
