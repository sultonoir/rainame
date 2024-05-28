import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { productRouter } from "./routers/productRouter";
import { userRouter } from "./routers/userRouter";
import { categoryRouter } from "./routers/categoryRouter";
import { subCategoryRouter } from "./routers/subCategoryRouter";
import { sizesRouter } from "./routers/sizesRouter";
import { cartRouter } from "./routers/cartRouter";
import { wishlistRouter } from "./routers/wishlistRouter";
import { paymentRouter } from "./routers/paymentRouter";
import { notifyRouter } from "./routers/notifyRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product: productRouter,
  user: userRouter,
  category: categoryRouter,
  subCategory: subCategoryRouter,
  sizes: sizesRouter,
  cart: cartRouter,
  wishlist: wishlistRouter,
  payment: paymentRouter,
  notifi: notifyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
