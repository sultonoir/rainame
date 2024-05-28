import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { notifi, notifiRead } from "@/server/db/schema";
import { desc, eq, isNull, or } from "drizzle-orm";
import { z } from "zod";

export const notifyRouter = createTRPCRouter({
  notifyIndicator: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const notify = await ctx.db
      .select({ notifi, isRead: notifiRead.isRead })
      .from(notifi)
      .leftJoin(
        notifiRead,
        or(eq(notifi.id, notifiRead.notifiId), isNull(notifiRead.userId)),
      )
      .where(or(eq(notifi.userId, userId), isNull(notifi.userId)))
      .orderBy(desc(notifi.createdAt));

    const count = notify.filter((item) => item.isRead === null);
    return {
      notifications: notify,
      idicator: count.length,
    };
  }),
  markAllReads: protectedProcedure
    .input(
      z.object({
        notifiId: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (input.notifiId.length >= 0) {
        return;
      }
      const values = input.notifiId.flatMap((item) => ({
        notifiId: item,
        isRead: true,
        userId,
      }));

      await ctx.db.insert(notifiRead).values(values);
    }),
  markOneRead: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const validator = await ctx.db.query.notifiRead.findMany({
        where: (q, { eq }) => eq(q.notifiId, input.id),
      });

      if (validator.length > 0) {
        return;
      }

      await ctx.db
        .insert(notifiRead)
        .values({ notifiId: input.id, isRead: true, userId });
    }),
});
