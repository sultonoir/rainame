import { type ProtectedTRPCContext, type TRPCContext } from "../../trpc";
import { type GetUserInput } from "./user.input";

export const getUser = async (
  ctx: ProtectedTRPCContext,
  { id }: GetUserInput,
) => {
  return await ctx.db.user.findUnique({
    where: {
      id,
    },
  });
};

export const getAlluser = async (ctx: TRPCContext) => {
  return await ctx.db.user.findMany();
};
