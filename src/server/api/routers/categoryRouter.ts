import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { category } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const categoryRouter = createTRPCRouter({
  getCategory: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.category.findMany();
    return result;
  }),
  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.session.user.role === "admin";
      if (!admin) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Access denied" });
      }
      const id = input.name.toLowerCase();
      await ctx.db.insert(category).values({ name: input.name, id });
    }),
  removeCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.session.user.role === "admin";
      if (!admin) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Access denied" });
      }
      await ctx.db.delete(category).where(eq(category.id, input.id));
    }),
  editCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.session.user.role === "admin";
      if (!admin) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Access denied" });
      }

      const exist = await ctx.db.query.category.findFirst({
        where: (q, { eq }) => eq(q.id, input.id),
      });

      if (!exist) {
        await ctx.db
          .insert(category)
          .values({ name: input.name, id: input.name });
        return "Category created";
      }

      await ctx.db
        .update(category)
        .set({ name: input.name })
        .where(eq(category.id, input.id));
      return "Category updated";
    }),
});
