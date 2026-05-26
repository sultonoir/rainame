import { db } from "@/lib/db";
import { cacheLife } from "next/cache";

export async function GET() {
  const start = performance.now();
  const products = await getProducts();
  const end = performance.now();
  const duration = end - start;
  return Response.json({
    duration: duration.toFixed(0) + "ms",
    data: products,
  });
}

async function getProducts() {
  "use cache";
  cacheLife("hours");

  return await db.product.findMany({
    take: 10,
  });
}
