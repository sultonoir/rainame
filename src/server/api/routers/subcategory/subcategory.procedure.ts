import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as input from "./subcategory.input";
import * as service from "./subcategory.service";

export const subcategoryProcedure = createTRPCRouter({
  byCategoryId: protectedProcedure
    .input(input.getByCategoryInput)
    .query(({ ctx, input }) => service.getByCategoryId(ctx, input)),

  list: protectedProcedure.query(({ ctx }) => service.listSubcategory(ctx)),

  post: protectedProcedure
    .input(input.postSubCategoryInput)
    .mutation(({ ctx, input }) => service.createSubCategory(ctx, input)),
});
