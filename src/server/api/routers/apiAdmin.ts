import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const apiAdmin = createTRPCRouter({
  createAdmin: publicProcedure
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

      await ctx.db.store.create({
        data: {
          email,
          hashedPassword,
        },
      });
    }),
  getAdmin: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const admin = await ctx.db.store.findUnique({
      where: {
        id,
      },
    });
    if (!admin) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });
    }
    return admin;
  }),
  updateAdmin: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        currentPassword: z.string().optional(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, currentPassword, imageUrl } = input;
      const id = ctx.session.user.id;
      const admin = await ctx.db.store.findUnique({
        where: {
          id,
        },
      });

      if (!admin) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });
      }
      if (imageUrl) {
        await ctx.db.store.update({
          where: {
            id,
          },
          data: {
            image: imageUrl,
          },
        });
      }
      if (name) {
        await ctx.db.store.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });
      }

      if (currentPassword) {
        await ctx.db.store.update({
          where: {
            id,
          },
          data: {
            hashedPassword: currentPassword,
          },
        });
      }
    }),
  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await ctx.db.store.findUnique({
        where: {
          email,
        },
      });
      if (!admin) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });
      }
      await ctx.db.store.update({
        where: {
          email,
        },
        data: {
          hashedPassword,
        },
      });
    }),
});
