import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as input from "./coupon.input";
import * as service from "./coupon.service";

export const couponProcedure = createTRPCRouter({
  post: protectedProcedure
    .input(input.createCouponInput)
    .mutation(({ ctx, input }) => service.createCoupon(ctx, input)),
});
