import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  cookies().set("codeVerifier", codeVerifier, {
    httpOnly: true,
  });

  cookies().set("state", state, {
    httpOnly: true,
  });

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"],
  });

  return Response.redirect(url);
}
