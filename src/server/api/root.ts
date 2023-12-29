import { createTRPCRouter } from "@/server/api/trpc";
import { apiUser } from "./routers/apiUser";
import { apiProduct } from "./routers/apiProduct";
import { apiCart } from "./routers/apiCart";
import { apiRating } from "./routers/apiRating";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  rating: apiRating,
  user: apiUser,
  product: apiProduct,
  cart: apiCart,
});

// export type definition of API
export type AppRouter = typeof appRouter;
