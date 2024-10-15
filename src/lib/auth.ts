import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, passkey, twoFactor } from "better-auth/plugins";
import { resend } from "./email/resend";
import { reactResetPasswordEmail } from "./email/rest-password";

const from = "onboarding@resend.dev";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(url, user) {
      await resend.emails.send({
        from,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
    sendEmailVerificationOnSignUp: true,
    async sendVerificationEmail(url, user) {
      console.log("Sending verification email to", user.email);
      const res = await resend.emails.send({
        from,
        to: "sultonalidrus5@gmail.com",
        subject: "Verify your email address",
        html: `<a href="${url}">Verify your email address</a>`,
      });
      console.log(res, user.email);
    },
  },
  plugins: [
    twoFactor({
      issuer: "Rainame",
      otpOptions: {
        async sendOTP(user, otp) {
          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: user.email,
            subject: "Your OTP",
            html: `Your OTP is ${otp}`,
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
