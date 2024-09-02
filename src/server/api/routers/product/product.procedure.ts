import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as input from "./product.input";
import * as service from "./product.service";
export const productProcedure = createTRPCRouter({
  post: protectedProcedure
    .input(input.postProductInput)
    .mutation(({ ctx, input }) => service.postProduct(ctx, input)),
});
