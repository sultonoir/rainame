import type * as input from "./subcategory.input";
import type { ProtectedTRPCContext } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { subcategory } from "@/server/db/schema";

export const subcategoryService = {
  async create(input: input.SubcategoryInput, ctx: ProtectedTRPCContext) {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to perform this action",
      });
    }

    const createSubcategory = await ctx.db
      .insert(subcategory)
      .values(input)
      .returning();
    const result = createSubcategory[0];
    if (!result) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error create subcategory",
      });
    }
    return result;
  },

  async byCategoryId(
    input: input.FindByCategoryIdInput,
    ctx: ProtectedTRPCContext,
  ) {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to perform this action",
      });
    }

    const result = await ctx.db.query.subcategory.findMany({
      where: (q, { eq }) => eq(q.categoryId, input.categoryId),
    });
    return result;
  },
};
