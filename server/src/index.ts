import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, registerShutdownHandlers } from './config/db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ success: true, message: 'Server healthy' }));

const PORT = Number(process.env.PORT) || 5000;

async function bootstrap() {
  await connectDB();
  registerShutdownHandlers();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});