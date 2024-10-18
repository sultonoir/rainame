import * as input from "./subcategory.input";
import * as service from "./subcategory.service";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const subcategoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(input.SubcategoryInput)
    .mutation(async ({ input, ctx }) => {
      return await service.subcategoryService.create(input, ctx);
    }),
  byCategoryId: protectedProcedure
    .input(input.FindByCategoryIdInput)
    .query(async ({ input, ctx }) => {
      return await service.subcategoryService.byCategoryId(input, ctx);
    }),
});
