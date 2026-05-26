import { db } from "@/lib/db";
import { Elysia, t } from "elysia";

export const app = new Elysia({ prefix: "/api/v2" })
  .get("/", async ({ set }) => {
    set.headers["Cache-Control"] = "public, max-age=3600";
    const start = performance.now();
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
      },
      take: 10,
    });
    const end = performance.now();
    const duration = end - start;
    return {
      duration: duration.toFixed(0) + "ms",
      data: products,
    };
  })
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

export type App = typeof app;

// Export HTTP method handlers
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
