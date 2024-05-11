/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";
import { db } from "@/server/db";
import { createTable, type users } from "@/server/db/schema";
import CredentialsProvider from "next-auth/providers/credentials";
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string | null;
    role: string;
  }
}

type Users = typeof users.$inferSelect;

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
    jwt({ token, user, trigger, session }) {
      const u = user as unknown as Users;
      if (trigger === "update" && session) {
        token.name = session.name;
        token.picture = session.image;
        token.role = session.role;
      }
      if (user) {
        return {
          ...token,
          id: u.id,
          email: u.email,
          name: u.name,
          picture: u.image,
          role: u.role,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "signin",
      name: "signin",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }
        const user = await db.query.users.findFirst({
          where: (q, { eq }) => eq(q.email, credentials.email),
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
