import { generateId } from "lucia";
import { type TRPCContext, type ProtectedTRPCContext } from "../../trpc";
import { type PostCategorySchema } from "./category.input";

export const createCategory = async (
  ctx: ProtectedTRPCContext,
  { name }: PostCategorySchema,
) => {
  const id = generateId(10);
  return await ctx.db.category.create({
    data: {
      name,
      id,
    },
  });
};

export const getAllCategory = async (ctx: ProtectedTRPCContext) => {
  return await ctx.db.category.findMany();
};

export const withSub = async (ctx: TRPCContext) => {
  return ctx.db.category.findMany({
    include: {
      subcategories: true,
    },
  });
};
