import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "@/database/db";
import { sendEmail } from "../resend/email";
import {
  RESET_PASSWORD_EMAIL_TEMPLATE,
  VERIFY_EMAIL_TEMPLATE,
} from "../resend/templates";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  trustedOrigins: [
    "http://localhost:3000", // dev
    "https://dapp-trading-assistant.vercel.app", // production
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        name: user.name,
        email: user.email,
        subject: "Reset your password",
        url,
        htmlTemplate: RESET_PASSWORD_EMAIL_TEMPLATE,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        name: user.name,
        email: user.email,
        subject: "Verify your email",
        url,
        htmlTemplate: VERIFY_EMAIL_TEMPLATE,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
});
