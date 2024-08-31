import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as input from "./category.input";
import * as service from "./category.service";

export const categoryProcedure = createTRPCRouter({
  getall: protectedProcedure.query(({ ctx }) => service.getAllCategory(ctx)),
  post: protectedProcedure
    .input(input.postCategoryInput)
    .mutation(({ ctx, input }) => service.createCategory(ctx, input)),
});
