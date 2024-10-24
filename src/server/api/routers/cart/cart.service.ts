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

export async function getInviteCart({
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

export async function removeCart({
  ctx,
  input,
}: {
  ctx: ProtectedTRPCContext;
  input: input.CartRemoveInput;
}) {
  const remove = await ctx.db.cart.delete({
    where: {
      id: input.cartId,
    },
    include,
  });

  return remove;
}

export async function removeAllCart(ctx: ProtectedTRPCContext) {
  const remove = await ctx.db.cart.deleteMany({
    where: {
      userId: ctx.user.id,
    },
  });

  return remove;
}

export async function getCart({ ctx }: { ctx: ProtectedTRPCContext }) {
  const carts = await ctx.db.cart.findMany({
    where: {
      userId: ctx.user.id,
    },
    include,
  });

  return carts;
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
