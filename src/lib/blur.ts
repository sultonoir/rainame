"use server";
import Jimp from "jimp";

export const createBlurhash = async (
  imageUrl: string,
  width: number,
  height: number,
) => {
  const jimpImage = await Jimp.read(imageUrl);
  jimpImage.resize(width, height);
  jimpImage.blur(50);

  // storing the transformed image
  // in Base64 format
  const transformedImage = await jimpImage.getBase64Async(Jimp.MIME_JPEG);
  return transformedImage;
};
