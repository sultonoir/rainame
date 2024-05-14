"use client";
import React, { useState } from "react";

const Test: React.FC = () => {
  const [resizedImage, setResizedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Tentukan ukuran baru
        const newWidth = 200; // Ganti sesuai kebutuhan
        const newHeight = 200; // Ganti sesuai kebutuhan

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Menambahkan efek blur
        ctx.filter = "blur(50px)"; // Ganti nilai blur sesuai kebutuhan

        // Menggambar gambar ke kanvas dengan ukuran baru dan efek blur
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Mengambil data URL dari kanvas
        const resizedImageUrl = canvas.toDataURL("image/jpeg");

        // Menyimpan URL gambar yang telah diubah ukurannya ke state
        setResizedImage(resizedImageUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br />
      {resizedImage && (
        <div>
          <h2>Gambar yang telah diubah ukurannya:</h2>
          <img src={resizedImage} alt="Resized" />
        </div>
      )}
    </div>
  );
};

export default Test;
