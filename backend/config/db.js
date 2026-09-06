import mongoose from "mongoose";

// Cache the connection across serverless invocations. Without this, every
// cold start would open a new connection and quickly exhaust the DB's pool.
let cached = null;

const connectDB = async () => {
  // Already connected (warm invocation) - reuse it.
  if (cached && mongoose.connection.readyState === 1) {
    return cached;
  }

  try {
    cached = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${cached.connection.host}`);
    return cached;
  } catch (error) {
    // Don't process.exit() here: in a serverless function that would kill the
    // whole invocation. Log and rethrow so the request fails gracefully.
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
