import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import * as input from "./category.input";
import * as service from "./category.service";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(input.CategoryInput)
    .mutation(async ({ input, ctx }) => {
      return await service.categoryService.create(input, ctx);
    }),
  get: publicProcedure.query(async ({ ctx }) => {
    return await service.getCategory(ctx);
  }),
  getPublic: publicProcedure.query(async ({ ctx }) => {
    return await service.getPublicCategory(ctx);
  }),
});
