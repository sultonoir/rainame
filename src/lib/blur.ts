export const createImage = async (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.addEventListener("error", (error) => {
      reject(error);
    });
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export default async function getBlur(imageSrc: string): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const newWidth = 300; // Ganti sesuai kebutuhan
  const newHeight = 300; // Ganti sesuai kebutuhan

  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx!.filter = "blur(50px)";
  ctx!.drawImage(image, 0, 0, newWidth, newHeight);

  return new Promise((resolve) => {
    const dataUrl = canvas.toDataURL("image/jpeg");
    resolve(dataUrl);
  });
}
