import type * as input from "./category.input";
import type { ProtectedTRPCContext, PublicTRPCContext } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { category } from "@/server/db/schema";

export const categoryService = {
  async create(input: input.CategoryInput, ctx: ProtectedTRPCContext) {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to perform this action",
      });
    }
    const createCategory = await ctx.db
      .insert(category)
      .values({
        name: input.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    const result = createCategory[0];
    if (!result) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error create category",
      });
    }
    return result;
  },
};

export const getCategory = async (ctx: PublicTRPCContext) => {
  return await ctx.db.query.category.findMany();
};

export const getPublicCategory = async (ctx: PublicTRPCContext) => {
  return await ctx.db.query.category.findFirst({
    with: {
      subcategories: {
        columns: {
          name: true,
        },
      },
    },
  });
};
