"use client";

import { AnimatePresence, Reorder } from "framer-motion";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload } from "lucide-react";

interface FieldImageProps {
  images: File[];
  setImages: (values: File[]) => void;
}

export default function FieldImage({ images, setImages }: FieldImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uniqueNewFiles = acceptedFiles.filter(
        (file) =>
          !images.some((existingFile) => existingFile.name === file.name),
      );
      // Menambahkan file baru langsung tanpa menggunakan prev
      setImages([...images, ...uniqueNewFiles]);
    },
    [images, setImages], // Menjaga agar setImages tetap diperbarui
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-border"
        }`}
      >
        <Input type="file" className="hidden" {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12" />
        <p className="mt-2 text-sm">
          {isDragActive
            ? "Drop the images here ..."
            : "Drag 'n' drop some images here, or click to select images"}
        </p>
      </div>
      <h4 className="text-lg font-semibold">Files List (Drag to Reorder)</h4>
      <Reorder.Group
        axis="y"
        values={images}
        onReorder={setImages}
        layout
        className="flex max-h-[500px] flex-col space-y-2 overflow-auto"
      >
        <AnimatePresence>
          {images.map((file, index) => (
            <Reorder.Item
              key={file.name}
              value={file}
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.15, delay: index * 0.1 },
              }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
              className="flex cursor-move items-center space-x-2 rounded-lg bg-secondary p-2"
            >
              <div className="relative size-12 overflow-hidden rounded-sm lg:size-20">
                <Image
                  alt={file.name}
                  src={URL.createObjectURL(file)}
                  fill
                  className="object-cover"
                />
              </div>
              {index === 0 && (
                <span className="text-pretty rounded-sm bg-blue-100 px-3 py-1 font-semibold text-primary">
                  Thumbnail
                </span>
              )}

              <span className="flex-grow truncate">{file.name}</span>
              <Button
                variant="ghost"
                type="button"
                size="icon"
                onClick={
                  () => setImages(images.filter((f) => f !== file)) // Menghapus file dari daftar
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
