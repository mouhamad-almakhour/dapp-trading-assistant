export type AuthOperation = "signup" | "signin" | "signout" | "recovery" | "reset";

const fallbackMessages: Record<AuthOperation, string> = {
  signup: "We couldn't create your account right now. Please try again shortly.",
  signin: "We couldn't sign you in right now. Please try again shortly.",
  signout: "We couldn't sign you out. Please try again.",
  recovery: "We couldn't process your reset request. Please try again shortly.",
  reset: "We couldn't reset your password right now. Please try again shortly.",
};

// Only application-owned text crosses the server/client boundary. Never use
// exception messages, response headers, stacks, or submitted values here.
export function getAuthErrorMessage(error: unknown, operation: AuthOperation): string {
  const value = error && typeof error === "object"
    ? error as { body?: { code?: unknown }; code?: unknown; statusCode?: unknown; status?: unknown }
    : undefined;
  const status = value?.statusCode ?? value?.status;
  if (typeof status === "number" && status >= 500) return fallbackMessages[operation];
  if (status === 429 || status === "TOO_MANY_REQUESTS") {
    return "Too many attempts. Please wait a few minutes and try again.";
  }
  const code = value?.body?.code ?? value?.code;
  if (operation === "signup" && (code === "USER_ALREADY_EXISTS" || code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL")) {
    return "An account already uses this email. Sign in instead, or reset your password if you've forgotten it.";
  }
  if (operation === "signin" && ["INVALID_EMAIL_OR_PASSWORD", "INVALID_PASSWORD", "USER_NOT_FOUND", "CREDENTIAL_ACCOUNT_NOT_FOUND"].includes(String(code))) {
    return "The email or password is incorrect. Please check both and try again.";
  }
  if (operation === "signin" && code === "EMAIL_NOT_VERIFIED") {
    return "Please verify your email using the link in your inbox before signing in.";
  }
  if (operation === "reset" && (code === "INVALID_TOKEN" || code === "TOKEN_EXPIRED")) {
    return "This reset link is invalid or has expired. Request a new password reset link.";
  }
  if (["signup", "reset"].includes(operation)) {
    if (code === "PASSWORD_TOO_SHORT") return "Your password is too short. Use at least 8 characters.";
    if (code === "PASSWORD_TOO_LONG") return "Your password is too long. Use no more than 128 characters.";
  }
  if (operation !== "signout" && code === "INVALID_EMAIL") return "Enter a valid email address and try again.";
  return fallbackMessages[operation];
}
