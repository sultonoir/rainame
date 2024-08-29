import { google, lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";
import { db } from "@/server/db";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  try {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    if (!codeVerifier || !savedState || savedState !== state) {
      return Response.json(
        { error: "Invalid state or code verifier" },
        { status: 400 },
      );
    }

    const { accessToken, accessTokenExpiresAt, refreshToken } =
      await google.validateAuthorizationCode(code, codeVerifier);

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      },
    );

    const googleData = (await googleRes.json()) as GoogleUser;

    await db.$transaction(async (trx) => {
      const user = await trx.user.findUnique({ where: { id: googleData.id } });

      if (!user) {
        await trx.user.create({
          data: {
            email: googleData.email,
            id: googleData.id,
            name: googleData.name,
            image: googleData.picture,
          },
        });

        await trx.oauth.create({
          data: {
            accessToken,
            expiresAt: accessTokenExpiresAt,
            id: googleData.id,
            provider: "google",
            providerUserId: googleData.id,
            userId: googleData.id,
            refreshToken,
          },
        });
      } else {
        await trx.oauth.update({
          where: { id: googleData.id },
          data: {
            accessToken,
            expiresAt: accessTokenExpiresAt,
            refreshToken,
          },
        });
      }
    });

    const session = await lucia.createSession(googleData.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    cookies().set("state", "", { expires: new Date(0) });
    cookies().set("codeVerifier", "", { expires: new Date(0) });

    return new Response(null, {
      status: 302,
      headers: { Location: Paths.Home },
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
};
