import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import * as inputs from "./user.input";
import * as services from "./user.service";

export const userProsedure = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => services.getAlluser(ctx)),

  get: protectedProcedure
    .input(inputs.getUserSchema)
    .query(({ ctx, input }) => services.getUser(ctx, input)),
});
