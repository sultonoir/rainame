import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const apiRating = createTRPCRouter({
  createRating: protectedProcedure
    .input(
      z.object({
        value: z.number(),
        comment: z.string(),
        productId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { productId, value, comment } = input;
      await ctx.db.rattings.create({
        data: {
          value,
          comment,
          productId,
          userId,
        },
      });
    }),
});
