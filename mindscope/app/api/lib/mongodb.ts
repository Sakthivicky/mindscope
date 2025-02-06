

import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://sakthi007wicky007:5DYsaOEDtWbxdSVV@cluster0.0nfnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in .env.local');
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('✅ MongoDB is already connected.');
    return mongoose.connection;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
    throw error;
  }
};

export default connectToDatabase;
