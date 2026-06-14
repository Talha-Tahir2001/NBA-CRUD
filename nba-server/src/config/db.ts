import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  if (!process.env['MONGODB_URI']) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env['MONGODB_URI'] as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;