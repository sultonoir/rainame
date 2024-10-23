import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import * as input from "./cart.input";
import * as service from "./cart.service";

export const cartProcedure = createTRPCRouter({
  create: protectedProcedure
    .input(input.CartInput)
    .mutation(service.createCart),
  getCount: publicProcedure.query(async ({ ctx }) => service.getCount(ctx)),

  getCart: protectedProcedure.query(service.getCart),

  getCartInfinite: publicProcedure
    .input(input.CartItemInput)
    .query(async ({ ctx, input }) => service.getInviteCart({ ctx, input })),

  removeById: protectedProcedure
    .input(input.CartRemoveInput)
    .mutation(service.removeCart),

  removeAll: protectedProcedure.mutation(async ({ ctx }) =>
    service.removeAllCart(ctx),
  ),
});
