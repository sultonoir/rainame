export const Categories = [
  {
    title: "Man",
  },
  {
    title: "Women",
  },
  { title: `Kid's` },
  { title: "Universal" },
];

export const Subcategory = [
  {
    title: "Hat",
  },
  {
    title: "Clothes",
  },
  {
    title: "Pants",
  },
  {
    title: "Shoes",
  },
  {
    title: "Accessories",
  },
];

export const Sizes = [
  {
    name: "S",
  },
  {
    name: "M",
  },
  {
    name: "L",
  },
  {
    name: "XL",
  },
  {
    name: "XXL",
  },
  {
    name: "XXXL",
  },
  {
    name: "35",
  },
  {
    name: "36",
  },
  {
    name: "37",
  },
  {
    name: "38",
  },
  {
    name: "39",
  },
  {
    name: "40",
  },
  {
    name: "41",
  },
  {
    name: "42",
  },
];

export const Colors = [
  {
    name: "White",
    hex: "#fff",
    rgb: "0, 0, 0",
  },
  {
    name: "Red",
    hex: "#FF0000",
    rgb: "255, 0, 0",
  },
  {
    name: "Green",
    hex: "#00FF00",
    rgb: "0, 255, 0",
  },
  {
    name: "Blue",
    hex: "#0000FF",
    rgb: "0, 0, 255",
  },
  {
    name: "Yellow",
    hex: "#FFFF00",
    rgb: "255, 255, 0",
  },
  {
    name: "Orange",
    hex: "#FFA500",
    rgb: "255, 165, 0",
  },
  {
    name: "Purple",
    hex: "#800080",
    rgb: "128, 0, 128",
  },
  {
    name: "Pink",
    hex: "#FFC0CB",
    rgb: "255, 192, 203",
  },
  {
    name: "Brown",
    hex: "#A52A2A",
    rgb: "165, 42, 42",
  },
  {
    name: "Gray",
    hex: "#808080",
    rgb: "128, 128, 128",
  },
  {
    name: "Black",
    hex: "#000000",
    rgb: "0, 0, 0",
  },
];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
  { name: "DISCOUNT", uid: "discount" },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "SUBCATEGORY", uid: "subcategory", sortable: true },
  { name: "COLOR", uid: "color" },
  { name: "SIZE", uid: "size" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const category = [
  { name: "Man", uid: "man" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions, category };

export const createImage = async (url: string): Promise<HTMLImageElement> =>
  await new Promise((resolve, reject) => {
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

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(
  width: number,
  height: number,
  rotation: number,
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  rotation = 0,
  flip = { horizontal: false, vertical: false },
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file != null) {
        resolve(URL.createObjectURL(file));
      } else {
        reject(new Error("Failed to create blob."));
      }
    }, "image/jpeg");
  });
}
interface PropsCall {
  price: number;
  discount: number | null;
}

export const calculateTotalPrice = ({ price, discount }: PropsCall) => {
  let discountedPrice = price;
  if (discount && discount > 0) {
    const discountAmount = (price * discount) / 100;
    discountedPrice = price - discountAmount;
  }
  return {
    price,
    discountedPrice,
  };
};

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL != null)
    return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}
