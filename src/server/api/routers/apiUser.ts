import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const apiUser = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;
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
          name,
        },
      });
    }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const user = await ctx.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });
    }
    return user;
  }),
  forgotPass: publicProcedure
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

      if (!currentUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email not found",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          hashedPassword,
        },
      });
    }),
});
