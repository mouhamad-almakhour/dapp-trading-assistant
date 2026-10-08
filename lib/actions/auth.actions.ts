"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { inngest } from "../inngest/client";
import { getAuthErrorMessage } from "../better-auth/error-messages";

export const signUpWithEmail = async ({
  email,
  password,
  firstName,
  lastName,
  image,
}: SignUpServerData) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        image,
      },
    });

    // Account creation has succeeded. An optional welcome workflow failure
    // must not tell the user to retry registration for an existing account.
    try {
      await inngest.send({
        name: "app/user.signup",
        data: {
          name: `${firstName} ${lastName}`,
          email,
          url: process.env.NEXT_PUBLIC_APP_URL!,
        },
      });
    } catch {
      console.error("[auth] Signup welcome workflow could not be queued.");
    }

    return { success: true };
  } catch (e) {
    console.error("[auth] Signup request failed.");
    return {
      success: false,
      error: getAuthErrorMessage(e, "signup"),
    };
  }
};

export const signInWithEmail = async ({
  email,
  password,
  rememberMe,
}: SignInServerData) => {
  try {
    await auth.api.signInEmail({
      body: { email, password, rememberMe },
      headers: await headers(),
    });

    return { success: true };
  } catch (e) {
    console.error("[auth] Signin request failed.");
    return {
      success: false,
      error: getAuthErrorMessage(e, "signin"),
    };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (e) {
    console.error("[auth] Signout request failed.");
    return {
      success: false,
      error: getAuthErrorMessage(e, "signout"),
    };
  }
};

export const forgetPasswordRequest = async ({
  email,
}: ForgetPasswordServerData) => {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email, // required
        redirectTo: "/reset-password",
      },
    });
    return { success: true };
  } catch (e) {
    console.error("[auth] Password recovery request failed.");
    return {
      success: false,
      error: getAuthErrorMessage(e, "recovery"),
    };
  }
};

export const resetPassword = async ({
  password,
  token,
}: ResetPasswordServerData) => {
  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password, // required
        token, // required
      },
    });
    return { success: true };
  } catch (e) {
    console.error("[auth] Password reset request failed.");
    return {
      success: false,
      error: getAuthErrorMessage(e, "reset"),
    };
  }
};
