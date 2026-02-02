"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export const signUpWithEmail = async ({
  email,
  password,
  firstName,
  lastName,
  image,
}: SignUpServerData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        image,
      },
    });

    return { success: true, data: response };
  } catch (e) {
    console.error("Error during sign-up:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Sign up failed",
    };
  }
};

export const signInWithEmail = async ({
  email,
  password,
  rememberMe,
}: SignInServerData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password, rememberMe },
      headers: await headers(),
    });

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign in failed", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error during sign in",
    };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true };
  } catch (e) {
    console.error("Sign out failed", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Sign out failed",
    };
  }
};

export const forgetPasswordRequest = async ({
  email,
}: ForgetPasswordServerData) => {
  try {
    const response = await auth.api.requestPasswordReset({
      body: {
        email, // required
        redirectTo: "/reset-password",
      },
    });
    return { success: true, data: response };
  } catch (e) {
    console.error("Error during password reset request:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Password reset failed",
    };
  }
};

export const resetPassword = async ({
  password,
  token,
}: ResetPasswordServerData) => {
  try {
    const response = await auth.api.resetPassword({
      body: {
        newPassword: password, // required
        token, // required
      },
    });
    return { success: true, data: response };
  } catch (e) {
    console.error("Error during password reset:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Password reset failed",
    };
  }
};
