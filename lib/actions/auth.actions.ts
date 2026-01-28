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
    const result = await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        image,
      },
    });

    return { success: true, data: result };
  } catch (e) {
    console.error("Error during sign-up:", e);

    const errorMessage = e instanceof Error ? e.message : "Sign up failed";

    return { success: false, error: errorMessage };
  }
};

export const signInWithEmail = async ({
  email,
  password,
  rememberMe,
}: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email, password, rememberMe },
      headers: await headers(),
    });

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign in failed", e);
    return { success: false, error: "Sign in failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Sign out failed", e instanceof Error);
    return { success: false, error: "Sign out failed" };
  }
};
