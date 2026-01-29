import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

const client = new MongoClient(MONGODB_URI);
export const db = client.db();
