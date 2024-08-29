import { facebook, lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";
import { db } from "@/server/db";
import { type FacebookData } from "@/types";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  try {
    const code = searchParams.get("code");

    if (!code) {
      return Response.json(
        { error: "Invalid request" },
        {
          status: 400,
        },
      );
    }

    const { accessToken, accessTokenExpiresAt } =
      await facebook.validateAuthorizationCode(code);

    const facebookRes = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`,
      {
        method: "GET",
      },
    );

    const facebookData = (await facebookRes.json()) as FacebookData;
    console.log(facebookData);
    const image = facebookData.picture.data.url;
    const transactionRes = await db.$transaction(async (trx) => {
      try {
        const existingUser = await trx.user.findUnique({
          where: {
            email: facebookData.email,
          },
        });

        if (!existingUser) {
          const userId = generateId(10);
          await trx.user.create({
            data: {
              id: userId,
              email: facebookData.email,
              name: facebookData.name,
              image,
              emailVerification: true,
            },
          });

          await trx.oauth.create({
            data: {
              accessToken,
              expiresAt: accessTokenExpiresAt,
              provider: "facebook",
              providerUserId: facebookData.id,
              userId,
              id: generateId(10),
            },
          });

          return {
            success: true,
            message: "User logged in successfully",
            data: {
              id: userId,
            },
          };
        } else {
          await trx.oauth.updateMany({
            where: {
              providerUserId: facebookData.id,
            },
            data: {
              accessToken,
              expiresAt: accessTokenExpiresAt,
            },
          });
        }

        return {
          success: true,
          message: "User logged in successfully",
          data: {
            id: existingUser?.id,
          },
        };
      } catch (error) {
        const e = error as Error;
        return {
          success: false,
          message: e.message,
          data: null,
        };
      }
    });

    if (!transactionRes.success || !transactionRes.data)
      throw new Error(transactionRes.message);

    const session = await lucia.createSession(transactionRes?.data?.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return new Response(null, {
      status: 302,
      headers: { Location: Paths.Home },
    });
  } catch (error) {
    const e = error as Error;
    return Response.json(
      { error: e.message },
      {
        status: 500,
      },
    );
  }
};
