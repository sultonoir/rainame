"use server";

/* eslint @typescript-eslint/no-explicit-any:0, @typescript-eslint/prefer-optional-chain:0 */

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateId, Scrypt } from "lucia";
import { isWithinExpirationDate, TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { lucia } from "@/lib/auth";
import { db } from "@/server/db";
import {
  loginSchema,
  signupSchema,
  type LoginInput,
  type SignupInput,
  resetPasswordSchema,
} from "@/lib/validators/auth";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "../constants";
import { env } from "@/env";
import { extractUsername } from "../utils";
import { EmailTemplate, sendMail } from "../email";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function login(
  _: any,
  formData: FormData,
): Promise<ActionResponse<LoginInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password,
  );
  if (!validPassword) {
    return {
      formError: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set({
    name: sessionCookie.name,
    value: sessionCookie.value,
    httpOnly: true,
    path: "/",
    maxAge: 24 * 60 * 60 * 7,
  });

  return existingUser.role === "user"
    ? redirect(Paths.Home)
    : redirect(Paths.Dashboard);
}

export async function signup(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;
  const name = extractUsername(email);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      formError: "Cannot create account with that email",
    };
  }

  const userId = generateId(10);
  const hashedPassword = await new Scrypt().hash(password);
  await db.user.create({
    data: {
      id: userId,
      email,
      name,
      emailVerification: false,
      hashedPassword,
    },
  });

  const verificationCode = await generateEmailVerificationCode(userId, email);
  await sendMail(email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(Paths.VerifyEmail);
}

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "No session found",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function resendVerificationEmail(): Promise<{
  error?: string;
  success?: boolean;
}> {
  const { user } = await validateRequest();
  if (!user) {
    return redirect(Paths.Login);
  }
  const lastSent = await db.emailVerificationCodes.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    return {
      error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
    };
  }
  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email,
  );
  await sendMail(user.email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });

  return { success: true };
}

export async function verifyEmail(
  _: any,
  formData: FormData,
): Promise<{ error: string } | void> {
  const code = formData.get("code");
  if (typeof code !== "string" || code.length !== 6) {
    return { error: "Invalid code" };
  }
  const { user } = await validateRequest();
  if (!user) {
    return redirect(Paths.Login);
  }
  const dbCode = await db.$transaction(async (tx) => {
    const item = await tx.emailVerificationCodes.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (item) {
      await tx.emailVerificationCodes.delete({
        where: {
          id: item.id,
        },
      });
    }
    return item;
  });

  if (!dbCode || dbCode.code !== code)
    return { error: "Invalid verification code" };

  if (!isWithinExpirationDate(dbCode.expiresAt))
    return { error: "Verification code expired" };

  if (dbCode.email !== user.email) return { error: "Email does not match" };

  await lucia.invalidateUserSessions(user.id);
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerification: true,
    },
  });
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return user.role === "user"
    ? redirect(Paths.Home)
    : redirect(Paths.Dashboard);
}

export async function sendPasswordResetLink(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email");
  const parsed = z.string().trim().email().safeParse(email);
  if (!parsed.success) {
    return { error: "Provided email is invalid." };
  }

  try {
    const user = await db.user.findFirst({
      where: {
        email: parsed.data,
      },
    });

    if (!user || !user.emailVerification)
      return { error: "Provided email is invalid." };

    const verificationToken = await generatePasswordResetToken(user.id);

    const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`;

    await sendMail(user.email, EmailTemplate.PasswordReset, {
      link: verificationLink,
    });

    return { success: true };
  } catch (error) {
    const e = error as Error;
    console.log(e.message);
    return { error: "Failed to send verification email." };
  }
}

export async function resetPassword(
  _: any,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = resetPasswordSchema.safeParse(obj);

  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      error: err.fieldErrors.password?.[0] ?? err.fieldErrors.token?.[0],
    };
  }
  const { token, password } = parsed.data;

  const dbToken = await db.$transaction(async (tx) => {
    const item = await tx.passwordResetTokens.findFirst({
      where: {
        id: token,
      },
    });
    if (item) {
      await tx.passwordResetTokens.delete({
        where: {
          id: token,
        },
      });
    }
    return item;
  });

  if (!dbToken) return { error: "Invalid password reset link" };

  if (!isWithinExpirationDate(dbToken.expiresAt))
    return { error: "Password reset link expired." };

  await lucia.invalidateUserSessions(dbToken.userId);
  const hashedPassword = await new Scrypt().hash(password);
  await db.user.update({
    where: {
      id: dbToken.userId,
    },
    data: {
      hashedPassword,
    },
  });
  const session = await lucia.createSession(dbToken.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect(Paths.Home);
}

const timeFromNow = (time: Date) => {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
};

async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db.emailVerificationCodes.deleteMany({
    where: {
      userId,
    },
  });
  const code = generateRandomString(6, alphabet("0-9")); // 6 digit code
  const id = generateId(10);
  await db.emailVerificationCodes.create({
    data: {
      id,
      userId,
      email,
      code,
      expiresAt: createDate(new TimeSpan(1, "m")), // 10 minutes
    },
  });
  return code;
}

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db.passwordResetTokens.deleteMany({
    where: {
      userId,
    },
  });
  const tokenId = generateId(40);
  await db.passwordResetTokens.create({
    data: {
      id: tokenId,
      userId,
      expiresAt: createDate(new TimeSpan(2, "h")),
    },
  });
  return tokenId;
}
