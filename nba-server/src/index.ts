import express, { type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { setServers } from 'node:dns/promises';
import playerRoutes from './routes/playerRoutes.js';

setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

const app = express();
const port = process.env['PORT'] || 8000;

// Enable CORS for your frontend origin
app.use(cors({
  origin: 'http://localhost:5173',  // Vite default port
  credentials: true,
}));

try {
  await connectDB();
  console.log('Database connected');
} catch (error) {
  console.error('Database connection failed:', error);
  process.exit(1);
}



app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ... routes

app.use('/api/players', playerRoutes);

// Health check
app.get('/', (res: Response) => {
  res.send('NBA API is running 🏀');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});