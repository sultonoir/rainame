import { generateId } from "lucia";
import { type ProtectedTRPCContext } from "../../trpc";
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
