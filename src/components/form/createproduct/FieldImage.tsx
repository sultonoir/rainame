"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useDraft from "@/hook/useDraft";
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { type ChangeEvent } from "react";

interface Props {
  valueChange: (value: string[]) => void;
}

const FieldImage = ({ valueChange }: Props) => {
  const { images, setImages } = useDraft();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const uniqueFiles: File[] = [];

      newFiles.forEach((file) => {
        if (!file.type.includes("image")) return;

        const isDuplicate = images?.some((item) => item.name === file.name);
        if (!isDuplicate) {
          uniqueFiles.push(file);
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
      });
      const newImages = [...images, ...uniqueFiles];
      const values = newImages.map((item) => {
        const result = URL.createObjectURL(item);
        return result;
      });
      valueChange(values);
      setImages([...images, ...uniqueFiles]);
    }
  };

  const handleDelete = (value: string) => {
    const newFile = [...images];
    const newImage = newFile.filter((item) => item.name !== value);
    setImages(newImage);
  };
  const handleClick = (title: string) => {
    const imageIndex = images.findIndex((item) => item.name === title);
    if (imageIndex !== -1) {
      const newImages = [...images];
      const image = newImages.splice(imageIndex, 1)[0];
      newImages.unshift(image!);
      setImages(newImages);
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {images.map((item, index) => (
        <div className="group relative" key={item.name}>
          <Image
            src={URL.createObjectURL(item)}
            alt={item.name}
            width={160}
            height={160}
            className="aspect-square size-40 rounded-lg object-cover"
          />
          {index === 0 && (
            <p className="absolute left-1 top-1 w-fit rounded-lg bg-blue-100 px-3 py-1 text-xs text-primary">
              Main picture
            </p>
          )}
          <div className="absolute right-1 top-1 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              type="button"
              size="icon"
              className="text-xs"
              onClick={() => handleClick(item.name)}
            >
              Main
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => handleDelete(item.name)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
      <Label
        htmlFor="upload"
        className="flex size-40 items-center justify-center border border-dashed"
      >
        <ImagePlus />
      </Label>
      <input
        className="hidden"
        type="file"
        multiple
        id="upload"
        accept="image/*"
        onChange={(e) => handleImage(e)}
      />
    </div>
  );
};

export default FieldImage;
