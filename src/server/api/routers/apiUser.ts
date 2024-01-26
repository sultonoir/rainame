import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const apiUser = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;
      const currentUser = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });
      const hashedPassword = await bcrypt.hash(password, 10);

      if (currentUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email has ben used",
        });
      }

      await ctx.db.user.create({
        data: {
          email,
          hashedPassword,
          name,
        },
      });
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        currentPassword: z.string().optional(),
        imageUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, currentPassword, imageUrl } = input;
      const id = ctx.session.user.id;
      const user = await ctx.db.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "user not found" });
      }
      if (imageUrl) {
        await ctx.db.user.update({
          where: {
            id,
          },
          data: {
            image: imageUrl,
          },
        });
      }
      if (name) {
        await ctx.db.user.update({
          where: {
            id,
          },
          data: {
            name,
          },
        });
      }

      if (currentPassword) {
        await ctx.db.user.update({
          where: {
            id,
          },
          data: {
            hashedPassword: currentPassword,
          },
        });
      }
    }),
  getMetaUser: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const user = await ctx.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });
    }
    return user;
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const user = await ctx.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Admin not found" });
    }
    return user;
  }),
  forgotPass: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;
      const currentUser = await ctx.db.user.findUnique({
        where: {
          email,
        },
      });

      if (!currentUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email not found",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          hashedPassword,
        },
      });
    }),
  getNotify: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        notify: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return user;
  }),
  readsNotify: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.updateMany({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        hasNotify: false,
      },
    });
    await ctx.db.notify.updateMany({
      where: {
        userId: ctx.session.user.id,
      },
      data: {
        reads: true,
      },
    });
  }),
  getNotifyAdmin: protectedProcedure.query(async ({ ctx }) => {
    const admin = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    const notify = await ctx.db.notify.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    const payments = await ctx.db.payment.findMany({
      where: {
        id: { in: notify.map((item) => item.paymentId ?? "") },
      },
      include: {
        user: true,
        dataPayment: true,
      },
    });

    return { admin, payments };
  }),
});
