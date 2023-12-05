import { createTRPCRouter } from "@/server/api/trpc";
import { apiAdmin } from "./routers/apiAdmin";
import { apiUser } from "./routers/apiUser";
import { apiProduct } from "./routers/apiProduct";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: apiAdmin,
  user: apiUser,
  product: apiProduct,
});

// export type definition of API
export type AppRouter = typeof appRouter;
