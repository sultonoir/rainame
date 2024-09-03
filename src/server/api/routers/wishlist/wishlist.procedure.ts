import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as input from "./wishlist.input";
import * as service from "./wishlist.service";
export const wishlistProcedure = createTRPCRouter({
  toggle: protectedProcedure
    .input(input.addWishlistInput)
    .mutation(({ ctx, input }) => service.toggleWishlist(ctx, input)),
});
