import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { subCategory } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const subCategoryRouter = createTRPCRouter({
  getSubCategory: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.subCategory.findMany({
        where: (q, { eq }) => eq(q.categoryId, input.categoryId),
      });
      return result;
    }),
  createSubCategory: protectedProcedure
    .input(
      z.object({
        categoryId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.session.user.role === "admin";
      if (!admin) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Access denied" });
      }
      const id = input.name.toLowerCase();
      await ctx.db.insert(subCategory).values({
        name: input.name,
        categoryId: input.categoryId,
        id,
      });
    }),
  removeSubCategory: protectedProcedure
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
      await ctx.db.delete(subCategory).where(eq(subCategory.id, input.id));
    }),
  editSubCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.session.user.role === "admin";

      if (!admin) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Access denied" });
      }

      const exist = await ctx.db.query.subCategory.findFirst({
        where: (q, { eq }) => eq(q.id, input.id),
      });

      if (!exist) {
        await ctx.db.insert(subCategory).values({
          name: input.name,
          categoryId: input.categoryId,
          id: input.name,
        });
        return "SubCategory created";
      }

      await ctx.db
        .update(subCategory)
        .set({ name: input.name })
        .where(eq(subCategory.id, input.id));
      return "SubCategory created";
    }),
});
