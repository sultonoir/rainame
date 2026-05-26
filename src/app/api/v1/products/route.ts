import { db } from "@/lib/db";
import { cacheLife } from "next/cache";

export async function GET() {
  const products = await getProducts();
  return Response.json(products);
}

async function getProducts() {
  "use cache";
  cacheLife("hours");

  return await db.product.findMany({
    take: 10,
  });
}
