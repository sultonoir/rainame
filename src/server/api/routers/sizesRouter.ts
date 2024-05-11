import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { sizes } from "@/server/db/schema";

export const sizesRouter = createTRPCRouter({
  getSizes: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.sizes.findMany();
    return result;
  }),
  createSizes: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.name.toLowerCase();
      await ctx.db.insert(sizes).values({ name: input.name, id });
    }),
});
