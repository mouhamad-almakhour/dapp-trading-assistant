import assert from "node:assert/strict";
import test from "node:test";
import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";
import { verifyPassword } from "better-auth/crypto";
import { handleOAuthUserInfo } from "better-auth/oauth2";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { ObjectId } from "mongodb";

// No application environment, real database, OAuth provider, or email service
// is loaded. These tests exercise the upgraded library contracts used by the app.
const password = "Upgrade-test-password!123";
const legacyHash =
  "ca3a04b3d9079f8ebeb4fe5a4b8da9bc:539ba97d2da671089516d4de387de3dda536e27504496b5f0838855b1f48f6ebd8b2ded0ef304bab90a11669fb8ca6a35ae97c97133779977087e8411b94de35";

function fixture() {
  const database = { user: [], account: [], session: [], verification: [] };
  const mail = { verification: [], reset: [] };
  const auth = betterAuth({
    database: memoryAdapter(database),
    baseURL: "http://localhost:3000",
    secret: "isolated-upgrade-test-secret-never-use-in-production",
    trustedOrigins: ["http://localhost:3000"],
    emailAndPassword: {
      enabled: true,
      sendResetPassword: async (message) => { mail.reset.push(message); },
    },
    user: {
      changeEmail: { enabled: true, updateEmailWithoutVerification: true },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async (message) => {
        mail.verification.push(message);
      },
    },
    rateLimit: { enabled: false },
    logger: { disabled: true },
  });
  return { auth, database, mail };
}

const body = (email = "user@example.test") => ({
  name: "Upgrade Test",
  email,
  password,
});

function cookieHeaders(headers) {
  const cookies = headers.getSetCookie()
    .map((value) => value.split(";")[0])
    .join("; ");
  assert.ok(cookies.includes("session_token="), "auth must issue a session cookie");
  return new Headers({ cookie: cookies, origin: "http://localhost:3000" });
}

test("password hashes produced by Better Auth 1.4.17 remain valid", async () => {
  assert.equal(await verifyPassword({ hash: legacyHash, password }), true);
  assert.equal(await verifyPassword({ hash: legacyHash, password: "incorrect" }), false);
});

test("MongoDB adapter preserves existing ObjectId user/account references", async () => {
  const userId = new ObjectId();
  const accountId = new ObjectId();
  const adapter = mongodbAdapter({
    collection(model) {
      return {
        aggregate(pipeline) {
          const filter = pipeline.find((stage) => stage.$match).$match;
          const expectedId = model === "user" ? userId : accountId;
          assert.ok(filter._id instanceof ObjectId);
          assert.equal(filter._id.toHexString(), expectedId.toHexString());
          const record = model === "user"
            ? { _id: userId, name: "Existing User", email: body().email, emailVerified: true }
            : { _id: accountId, userId, providerId: "credential", accountId: userId.toHexString(), password: legacyHash };
          return { async toArray() { return [record]; } };
        },
      };
    },
  })({ emailAndPassword: { enabled: true } });
  const user = await adapter.findOne({ model: "user", where: [{ field: "id", value: userId.toHexString() }] });
  assert.equal(user.id, userId.toHexString());
  const account = await adapter.findOne({ model: "account", where: [{ field: "id", value: accountId.toHexString() }] });
  assert.equal(account.userId, userId.toHexString());
  assert.equal(account.password, legacyHash);
});

test("signup, session, profile update, and logout retain their API contracts", async () => {
  const { auth, database, mail } = fixture();
  const signup = await auth.api.signUpEmail({ body: body(), returnHeaders: true });
  const headers = cookieHeaders(signup.headers);
  assert.equal(signup.response.user.email, body().email);
  assert.equal(database.user.length, 1);
  assert.equal(mail.verification.length, 1);
  assert.notEqual(database.account[0].password, password);
  assert.equal(await verifyPassword({ hash: database.account[0].password, password }), true);
  const session = await auth.api.getSession({ headers });
  assert.equal(session.user.id, signup.response.user.id);
  await auth.api.updateUser({ headers, body: { name: "Updated Name" } });
  assert.equal((await auth.api.getSession({ headers })).user.name, "Updated Name");
  await auth.api.signOut({ headers });
  assert.equal(await auth.api.getSession({ headers }), null);
});

test("existing password accounts can sign in and wrong passwords are rejected", async () => {
  const { auth, database } = fixture();
  await auth.api.signUpEmail({ body: body() });
  // Simulate an existing account retaining its pre-upgrade password hash.
  database.account[0].password = legacyHash;
  await assert.rejects(
    auth.api.signInEmail({ body: { email: body().email, password: "incorrect" } }),
    (error) => error.statusCode === 401,
  );
  const signin = await auth.api.signInEmail({
    body: { email: body().email, password, rememberMe: false },
    returnHeaders: true,
  });
  assert.equal((await auth.api.getSession({ headers: cookieHeaders(signin.headers) })).user.email, body().email);
});

test("password change revokes other sessions and accepts the new password", async () => {
  const { auth } = fixture();
  const signup = await auth.api.signUpEmail({ body: body(), returnHeaders: true });
  const other = await auth.api.signInEmail({
    body: { email: body().email, password }, returnHeaders: true,
  });
  const newPassword = "New-upgrade-password!456";
  const changed = await auth.api.changePassword({
    headers: cookieHeaders(signup.headers),
    body: { currentPassword: password, newPassword, revokeOtherSessions: true },
    returnHeaders: true,
  });
  assert.equal(await auth.api.getSession({ headers: cookieHeaders(other.headers) }), null);
  assert.ok(await auth.api.getSession({ headers: cookieHeaders(changed.headers) }));
  await assert.rejects(auth.api.signInEmail({ body: { email: body().email, password } }));
  await auth.api.signInEmail({ body: { email: body().email, password: newPassword } });
});

test("verification, email change, reset, and session revocation remain usable", async () => {
  const { auth, mail } = fixture();
  const signup = await auth.api.signUpEmail({ body: body(), returnHeaders: true });
  const headers = cookieHeaders(signup.headers);
  await auth.api.verifyEmail({ query: { token: mail.verification[0].token } });
  assert.equal((await auth.api.getSession({ headers })).user.emailVerified, true);
  const newEmail = "changed@example.test";
  await auth.api.changeEmail({ headers, body: { newEmail, callbackURL: "/dashboard" } });
  assert.equal((await auth.api.getSession({ headers })).user.email, body().email);
  await auth.api.verifyEmail({ query: { token: mail.verification.at(-1).token } });
  assert.equal((await auth.api.getSession({ headers })).user.email, newEmail);
  await auth.api.requestPasswordReset({ body: { email: newEmail, redirectTo: "/reset-password" } });
  assert.equal(mail.reset.length, 1);
  const token = mail.reset[0].token;
  const newPassword = "Reset-upgrade-password!789";
  await auth.api.resetPassword({ body: { token, newPassword } });
  await assert.rejects(auth.api.resetPassword({ body: { token, newPassword } }));
  const signin = await auth.api.signInEmail({
    body: { email: newEmail, password: newPassword }, returnHeaders: true,
  });
  const signinHeaders = cookieHeaders(signin.headers);
  await auth.api.revokeSessions({ headers: signinHeaders });
  assert.equal(await auth.api.getSession({ headers: signinHeaders }), null);
});

test("OAuth cannot implicitly link to an unverified pre-registered account", async () => {
  const { auth, database } = fixture();
  await auth.api.signUpEmail({ body: body() });
  const context = await auth.$context;
  const result = await handleOAuthUserInfo({ context }, {
    userInfo: {
      id: "provider-owned-id",
      name: "OAuth User",
      email: body().email,
      emailVerified: true,
    },
    account: { providerId: "google", accountId: "provider-owned-id" },
    isTrustedProvider: true,
  });
  assert.equal(result.data, null);
  assert.equal(result.error, "account not linked");
  assert.equal(database.account.filter((account) => account.providerId === "google").length, 0);
  assert.equal(database.user[0].emailVerified, false);
});
