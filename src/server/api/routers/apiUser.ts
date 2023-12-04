import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const apiUser = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const currentUser = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      const hashedPassword = await bcrypt.hash(password, 10);

      if (currentUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email has ben used",
        });
      }

      await ctx.db.user.create({
        data: {
          email,
          hashedPassword,
        },
      });
    }),
});
