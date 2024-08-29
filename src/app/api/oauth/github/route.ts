import { cookies } from "next/headers";
import { TimeSpan, createDate } from "oslo";
import { OAuth2RequestError } from "arctic";
import { github, lucia } from "@/lib/auth";
import { db } from "@/server/db";
import { Paths } from "@/lib/constants";
import { type NextRequest } from "next/server";
import { type GithubData } from "@/types";

export const GET = async (req: NextRequest): Promise<Response> => {
  const searchParams = req.nextUrl.searchParams;
  try {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const storedState = cookies().get("discord_oauth_state")?.value ?? null;

    if (!code || !state || !storedState || state !== storedState) {
      return new Response(null, {
        status: 400,
        headers: { Location: Paths.Login },
      });
    }

    const { accessToken } = await github.validateAuthorizationCode(code);

    const githubRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    const githubData = (await githubRes.json()) as GithubData;

    console.log("githubData", githubData);

    await db.$transaction(async (trx) => {
      const user = await trx.user.findUnique({
        where: {
          id: githubData.id.toString(),
        },
      });
      if (!user) {
        const createdUserRes = await trx.user.create({
          data: {
            id: githubData.id.toString(),
            name: githubData.name,
            image: githubData.avatar_url,
            email: githubData.id.toString(),
            emailVerification: true,
          },
        });

        if (!createdUserRes) {
          return Response.json(
            { error: "Failed to create user" },
            {
              status: 500,
            },
          );
        }

        const createdOAuthAccountRes = await trx.oauth.create({
          data: {
            accessToken,
            id: githubData.id.toString(),
            provider: "github",
            providerUserId: githubData.id.toString(),
            userId: createdUserRes.id,
            refreshToken: "",
            expiresAt: createDate(new TimeSpan(30, "d")),
          },
        });

        if (!createdOAuthAccountRes) {
          return Response.json(
            { error: "Failed to create OAuthAccountRes" },
            {
              status: 500,
            },
          );
        }
      } else {
        const updatedOAuthAccountRes = await trx.oauth.update({
          where: {
            id: githubData.id.toString(),
          },
          data: {
            accessToken,
          },
        });

        if (!updatedOAuthAccountRes) {
          return Response.json(
            { error: "Failed to update OAuthAccountRes" },
            {
              status: 500,
            },
          );
        }
      }

      return new Response(null, {
        status: 302,
        headers: { Location: Paths.Home },
      });
    });

    const session = await lucia.createSession(githubData.id.toString(), {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    cookies().set("state", "", {
      expires: new Date(0),
    });

    return new Response(null, {
      status: 302,
      headers: { Location: Paths.Home },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(JSON.stringify({ message: "Invalid code" }), {
        status: 400,
      });
    }
    console.error(e);

    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
