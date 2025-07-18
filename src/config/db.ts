import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/node-ts-rest-api';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:rirxFLLghbYQMoRzpUekWJUJIClIeJva@metro.proxy.rlwy.net:43265';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}; 