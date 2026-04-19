import { Db, Collection, Document } from 'mongodb';
import { getDb } from '../config/db';

/**
 * Migration: Initialize tasks collection with indexes
 * Run once on first app startup or via CLI
 */
export async function up(db: Db = getDb()): Promise<void> {
  const tasks: Collection<Document> = db.collection('tasks');

  // Create indexes for common queries
  await tasks.createIndex({ dueDate: 1 }, { name: 'idx_dueDate' });
  await tasks.createIndex({ isCompleted: 1 }, { name: 'idx_isCompleted' });
  await tasks.createIndex({ priority: 1 }, { name: 'idx_priority' });
  await tasks.createIndex({ createdAt: -1 }, { name: 'idx_createdAt_desc' });
  
  // Compound index for dashboard queries (today's pending tasks)
  await tasks.createIndex(
    { isCompleted: 1, dueDate: 1 },
    { name: 'idx_dashboard_filter', partialFilterExpression: { isCompleted: false } }
  );

  console.log('Migration 001: tasks collection indexes created');
}

export async function down(db: Db = getDb()): Promise<void> {
  const tasks: Collection<Document> = db.collection('tasks');
  
  await tasks.dropIndex('idx_dueDate');
  await tasks.dropIndex('idx_isCompleted');
  await tasks.dropIndex('idx_priority');
  await tasks.dropIndex('idx_createdAt_desc');
  await tasks.dropIndex('idx_dashboard_filter');
  
  console.log('Migration 001: indexes dropped');
}