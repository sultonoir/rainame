import { generateState } from "arctic";
import { facebook } from "@/lib/auth";

export async function GET(): Promise<Response> {
  const state = generateState();

  const url = await facebook.createAuthorizationURL(state, {
    scopes: ["email", "public_profile"],
  });

  return Response.redirect(url);
}
