import nextEnv from "@next/env";
import { MongoClient } from "mongodb";

// Read-only preflight. Never creates users, changes indexes, or migrates data.
// Match Next's environment loading; deployment variables still take precedence.
nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is required for the read-only auth preflight.");
  process.exitCode = 1;
} else {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  try {
    await client.connect();
    const db = client.db();
    const accounts = db.collection("account");
    const [users, accountCount, duplicateKeys, invalidKeys, orphanedAccounts] =
      await Promise.all([
        db.collection("user").countDocuments({}, { maxTimeMS: 5000 }),
        accounts.countDocuments({}, { maxTimeMS: 5000 }),
        accounts.aggregate([
          { $group: { _id: { providerId: "$providerId", accountId: "$accountId" }, count: { $sum: 1 } } },
          { $match: { count: { $gt: 1 } } },
          { $count: "count" },
        ], { maxTimeMS: 5000 }).toArray(),
        accounts.countDocuments({
          $or: [
            { providerId: { $exists: false } }, { providerId: null },
            { accountId: { $exists: false } }, { accountId: null },
          ],
        }, { maxTimeMS: 5000 }),
        accounts.aggregate([
          { $lookup: { from: "user", localField: "userId", foreignField: "_id", as: "owner" } },
          { $match: { owner: { $size: 0 } } },
          { $count: "count" },
        ], { maxTimeMS: 5000 }).toArray(),
      ]);
    const summary = {
      users,
      accounts: accountCount,
      duplicateAccountKeys: duplicateKeys[0]?.count ?? 0,
      invalidAccountKeys: invalidKeys,
      orphanedAccounts: orphanedAccounts[0]?.count ?? 0,
    };
    console.log(JSON.stringify(summary, null, 2));
    if (summary.duplicateAccountKeys || summary.invalidAccountKeys || summary.orphanedAccounts) {
      console.error("Review account integrity before testing the upgrade against this database.");
      process.exitCode = 1;
    } else {
      console.log("Read-only auth database preflight passed. No data or indexes changed.");
    }
  } catch (error) {
    // Avoid logging credentials, connection strings, hostnames, or user data.
    console.error("Auth database preflight could not complete:", error.name, error.code ?? "connection/query failure");
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}
