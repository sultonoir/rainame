"use client";
import NextImage from "next/image";
import React, { useState, type ChangeEvent } from "react";
import { blurImage } from "@/lib/blur";

// Helper function to blur image using canvas

const ImageUpload: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [blurring, setBlurring] = useState<boolean>(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setBlurring(true); // Start blurring process
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      const blurredImages: string[] = [];

      for (const imageSrc of newImages) {
        const blurredImage = await blurImage(imageSrc, 540);

        blurredImages.push(blurredImage);
      }

      setImages((prevImages) => [...prevImages, ...blurredImages]);
      setBlurring(false); // End blurring process
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      {blurring && <p>Processing...</p>}
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div key={index} className="image-wrapper">
            <NextImage
              src={image}
              alt={`upload-preview-${index}`}
              width={400}
              height={400}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
