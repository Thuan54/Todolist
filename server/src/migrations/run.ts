import { connectDB, closeDB } from '../config/db';
import { up as initTasks } from './001_init_tasks';

async function runMigrations() {
  await connectDB();
  
  try {
    await initTasks();
    console.log('All migrations completed');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await closeDB();
  }
}

runMigrations();