import { generateId } from "lucia";
import { type ProtectedTRPCContext } from "../../trpc";
import {
  type GetByCategorySchema,
  type PostSubCategorySchema,
} from "./subcategory.input";

export const createSubCategory = async (
  ctx: ProtectedTRPCContext,
  { category, name }: PostSubCategorySchema,
) => {
  const id = generateId(10);

  return await ctx.db.subcategory.create({
    data: {
      id,
      categoryId: category,
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
