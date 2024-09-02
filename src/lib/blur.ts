import { Buffer } from "node:buffer";

export async function createBlurHash(src: string) {
  const photoBlurFetch = await fetch(src);
  const photoBlurBuffer = Buffer.from(await photoBlurFetch.arrayBuffer());
  return `data:image/jpeg;base64,${photoBlurBuffer.toString("base64")}`;
}

export const blurImage = (
  imageSrc: string,
  blurAmount: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Gagal mendapatkan konteks canvas"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const blurredCanvas = document.createElement("canvas");
      blurredCanvas.width = canvas.width;
      blurredCanvas.height = canvas.height;
      const blurredCtx = blurredCanvas.getContext("2d");

      if (!blurredCtx) {
        reject(new Error("Gagal mendapatkan konteks canvas"));
        return;
      }

      blurredCtx.filter = `blur(${blurAmount}px)`;
      blurredCtx.drawImage(canvas, 0, 0);

      const blurredImage = blurredCanvas.toDataURL("image/png");
      resolve(blurredImage);
    };

    img.onerror = () => {
      reject(new Error("Gagal memuat gambar"));
    };
  });
};
