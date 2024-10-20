import { Lucia, TimeSpan } from "lucia";
import { Google, GitHub, Facebook } from "arctic";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { env } from "@/env.js";
import { db } from "@/server/db";
import { absoluteUrl } from "@/lib/utils";
import { type User } from "@prisma/client";

// Uncomment the following lines if you are using nodejs 18 or lower. Not required in Node.js 20, CloudFlare Workers, Deno, Bun, and Vercel Edge Functions.
// import { webcrypto } from "node:crypto";
// globalThis.crypto = webcrypto as Crypto;

const adapter = new PrismaAdapter(db.sessions, db.user);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      name: attributes.name,
      email: attributes.email,
      image: attributes.image,
      role: attributes.role,
      verify: attributes.emailVerification,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "session",

    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  absoluteUrl("/api/oauth/google"),
);
export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  {
    redirectURI: env.NEXT_PUBLIC_APP_URL + "/api/oauth/github",
  },
);

export const facebook = new Facebook(
  process.env.FACEBOOK_CLIENT_ID!,
  process.env.FACEBOOK_CLIENT_SECRET!,
  absoluteUrl("/api/oauth/facebook"),
);

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseSessionAttributes = object;
type DatabaseUserAttributes = Omit<User, "hashedPassword">;
