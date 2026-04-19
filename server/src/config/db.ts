import { MongoClient, Db, Collection, Document } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'work-management';

export async function connectDB(): Promise<Db> {
  if (db) return db; // Return cached instance

  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    
    console.log(`MongoDB connected: ${MONGO_URI}/${DB_NAME}`);
    return db;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw error;
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
}

export function getCollection<T extends Document>(name: string): Collection<T> {
  return getDb().collection<T>(name);
}

export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

// Graceful shutdown handler
export function registerShutdownHandlers() {
  const shutdown = async (signal: string) => {
    console.log(`\n Received ${signal}. Closing database connection...`);
    await closeDB();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  
  // Handle uncaught exceptions
  process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await closeDB();
    process.exit(1);
  });
}