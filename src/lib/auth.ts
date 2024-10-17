import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, passkey, twoFactor } from "better-auth/plugins";
import { EmailTemplate, sendMail } from "./email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days,
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(url, user) {
      await sendMail(user.email, EmailTemplate.PasswordReset, {
        username: user.email,
        resetLink: url,
      });
    },
    sendEmailVerificationOnSignUp: true,
    async sendVerificationEmail(url, user) {
      console.log("Sending verification email to", user.email);
      const res = await sendMail(user.email, EmailTemplate.EmailVerification, {
        username: user.email,
        resetLink: url,
      });
      console.log(res, user.email);
    },
  },
  plugins: [
    twoFactor({
      issuer: "Rainame",
      otpOptions: {
        async sendOTP(user, otp) {
          await sendMail(user.email, EmailTemplate.EmailOtp, {
            username: user.email,
            code: otp,
          });
        },
      },
    }),
    passkey(),
    admin(),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
