import { type ProtectedTRPCContext, type TRPCContext } from "@/server/api/trpc";
import type * as input from "./cart.input";
import { generateId } from "lucia";
import { type FormatCart } from "@/types";

export async function createCart({
  input,
  ctx,
}: {
  ctx: ProtectedTRPCContext;
  input: input.CartInput;
}) {
  const { userId, amount, size, productId } = input;
  const res: FormatCart = await ctx.db.$transaction(async (trx) => {
    const isExist = await trx.cart.findFirst({
      where: {
        userId,
        productId,
        size,
      },
    });
    if (!isExist) {
      const newCart = await trx.cart.create({
        data: {
          id: generateId(10),
          userId,
          amount,
          size,
          productId,
        },
        include,
      });
      return newCart;
    }
    const updateCart = await trx.cart.update({
      where: {
        id: isExist.id,
        size,
      },
      data: {
        amount: isExist.amount + amount,
      },
      include,
    });
    return updateCart;
  });

  return res;
}

export async function getCount(ctx: TRPCContext) {
  const userId = ctx.user?.id;

  if (!userId) return 0;

  const count = await ctx.db.cart.findMany({
    where: {
      userId,
    },
  });

  const result = count.reduce((acc, curr) => acc + curr.amount, 0);
  return result;
}

export async function getCart({
  input,
  ctx,
}: {
  input: input.CartItemInput;
  ctx: TRPCContext;
}) {
  const userId = ctx.user?.id;
  const cartEmpty: FormatCart[] = [];
  if (!userId)
    return {
      cart: cartEmpty,
      nextCursor: null,
    };

  const cart = await ctx.db.cart.findMany({
    where: {
      userId,
    },
    include,
    cursor: input.cursor ? { id: input.cursor } : undefined,
    take: input.limit + 1,
    orderBy: {
      createdAt: "desc",
    },
  });

  const nextCursor = cart.length > input.limit ? cart[input.limit]?.id : null;

  return {
    cart: cart.slice(0, input.limit),
    nextCursor,
  };
}

const include = {
  product: {
    select: {
      name: true,
      price: true,
      discount: true,
      id: true,
      slug: true,
      productImage: {
        take: 1,
      },
    },
  },
};
