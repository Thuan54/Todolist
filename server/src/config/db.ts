import { MongoClient, Db } from 'mongodb';

let db: Db | null = null;

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  const dbName = process.env.DB_NAME || 'todolist';
  const client = new MongoClient(uri);

  await client.connect();
  db = client.db(dbName);
  console.log(`MongoDB connected: ${uri}/${dbName}`);
}

export function getDb(): Db {
  if (!db) throw new Error('Database not initialized. Call connectDB() first.');
  return db;
}