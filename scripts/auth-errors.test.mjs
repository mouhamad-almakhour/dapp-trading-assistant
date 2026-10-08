import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import { APIError } from "better-auth/api";

const asModule = (source) => `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const compile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const messagesURL = asModule(compile(await readFile(new URL("../lib/better-auth/error-messages.ts", import.meta.url), "utf8")));
const { getAuthErrorMessage } = await import(messagesURL);

// Load the actual action implementation with fake external boundaries. No
// application environment, database writes, emails, or Inngest calls are used.
const fixture = {
  auth: { api: {} },
  inngest: { send: async () => {} },
  headers: async () => new Headers(),
};
globalThis.__authErrorTestFixture = fixture;
const fixturesURL = asModule(`export const { auth, inngest, headers } = globalThis.__authErrorTestFixture;`);
let actionSource = compile(await readFile(new URL("../lib/actions/auth.actions.ts", import.meta.url), "utf8"));
for (const specifier of ["@/lib/better-auth/auth", "next/headers", "../inngest/client"]) {
  assert.ok(actionSource.includes(JSON.stringify(specifier)));
  actionSource = actionSource.replace(JSON.stringify(specifier), JSON.stringify(fixturesURL));
}
actionSource = actionSource.replace('"../better-auth/error-messages"', JSON.stringify(messagesURL));
const actions = await import(asModule(actionSource));
const input = { email: "test@example.invalid", password: "test-password", firstName: "Test", lastName: "User", image: "" };

const logs = [];
const originalConsoleError = console.error;
test.beforeEach(() => {
  logs.length = 0;
  console.error = (...args) => logs.push(args);
});
test.afterEach(() => { console.error = originalConsoleError; });
test.after(() => { delete globalThis.__authErrorTestFixture; });

test("duplicate signup gives actionable text without returning the exception", async () => {
  fixture.auth.api.signUpEmail = async () => { throw new APIError("UNPROCESSABLE_ENTITY", {
    code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL", message: "private database details",
  }); };
  let sends = 0;
  fixture.inngest.send = async () => { sends++; };
  const result = await actions.signUpWithEmail(input);
  assert.equal(result.success, false);
  assert.match(result.error, /Sign in instead, or reset your password/);
  assert.equal(sends, 0);
  assert.doesNotMatch(JSON.stringify({ result, logs }), /private database details|test@example|test-password/);
});

test("Inngest failure after account creation keeps signup successful", async () => {
  let registrations = 0;
  fixture.auth.api.signUpEmail = async () => { registrations++; return { token: "private-session-token", user: { email: input.email } }; };
  fixture.inngest.send = async () => { throw new Error("Inngest key=private-event-key"); };
  assert.deepEqual(await actions.signUpWithEmail(input), { success: true });
  assert.equal(registrations, 1);
  assert.match(logs[0][0], /welcome workflow/);
  assert.doesNotMatch(JSON.stringify(logs), /private-event-key/);
});

test("unexpected failures never expose database credentials or stack traces", async () => {
  fixture.auth.api.signUpEmail = async () => { throw new Error("mongodb://user:secret@internal-host stacktrace"); };
  const result = await actions.signUpWithEmail(input);
  assert.equal(result.success, false);
  assert.match(result.error, /try again shortly/);
  assert.doesNotMatch(JSON.stringify({ result, logs }), /mongodb|secret|internal-host|stacktrace/);
});

test("wrong email and wrong password produce the same safe signin message", () => {
  assert.equal(getAuthErrorMessage({ code: "USER_NOT_FOUND" }, "signin"), getAuthErrorMessage({ body: { code: "INVALID_PASSWORD" } }, "signin"));
  assert.match(getAuthErrorMessage({ code: "EMAIL_NOT_VERIFIED" }, "signin"), /verify your email/);
});

test("expired reset links and rate limiting explain the next step", () => {
  assert.match(getAuthErrorMessage({ code: "TOKEN_EXPIRED" }, "reset"), /Request a new password reset link/);
  assert.match(getAuthErrorMessage({ status: 429, message: "private proxy" }, "signin"), /wait a few minutes/);
  assert.match(getAuthErrorMessage({ code: "PASSWORD_TOO_SHORT" }, "signup"), /at least 8/);
});

test("all remaining auth actions sanitize unexpected exceptions", async () => {
  const fail = async () => { throw new Error("private upstream response"); };
  fixture.auth.api.signInEmail = fail;
  fixture.auth.api.signOut = fail;
  fixture.auth.api.requestPasswordReset = fail;
  fixture.auth.api.resetPassword = fail;
  for (const result of [
    await actions.signInWithEmail(input),
    await actions.signOut(),
    await actions.forgetPasswordRequest(input),
    await actions.resetPassword({ password: input.password, token: "private-reset-token" }),
  ]) {
    assert.equal(result.success, false);
    assert.doesNotMatch(JSON.stringify(result), /private|upstream/);
  }
  assert.doesNotMatch(JSON.stringify(logs), /private|upstream/);
});

test("successful signin returns no session token or user record", async () => {
  fixture.auth.api.signInEmail = async () => ({ token: "private-session-token", user: { email: input.email } });
  assert.deepEqual(await actions.signInWithEmail(input), { success: true });
});
