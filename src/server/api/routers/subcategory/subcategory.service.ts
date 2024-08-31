import { generateId } from "lucia";
import { type ProtectedTRPCContext } from "../../trpc";
import {
  type GetByCategorySchema,
  type PostSubCategorySchema,
} from "./subcategory.input";
import { TRPCError } from "@trpc/server";

export const createSubCategory = async (
  ctx: ProtectedTRPCContext,
  { category, name }: PostSubCategorySchema,
) => {
  const id = generateId(10);
  const categories = await ctx.db.category.findUnique({
    where: {
      name: category,
    },
  });

  if (!categories) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "category not found" });
  }

  return await ctx.db.subcategory.create({
    data: {
      id,
      categoryId: categories.id,
      name,
    },
  });
};

export const listSubcategory = async (ctx: ProtectedTRPCContext) => {
  return await ctx.db.subcategory.findMany();
};

export const getByCategoryId = async (
  ctx: ProtectedTRPCContext,
  { categoryId }: GetByCategorySchema,
) => {
  return await ctx.db.subcategory.findMany({
    where: {
      categoryId,
    },
  });
};
