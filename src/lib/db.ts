import { connect } from "mongoose";

// .env file se MongoDB URL le rahe hain
let mongodbUrl = process.env.MONGODB_URL;

// Agar URL nahi mila to application start hi mat hone do
if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not defined in the environment variables.");
}

// Agar URL nahi mila to application start hi mat hone do
let cached = global.mongoose;

// Agar cached object exist nahi karta,
// tab naya object banao.
if (!cached) {
  cached = global.mongoose = {
    conn: null, // actual connection store hoga
    promise: null, // connection promise store hoga
  };
}

// Database connect karne wala async function
const connectDb = async () => {
  // Agar pehle se connection bana hua hai
  // to wahi return kar do
  if (cached.conn) {
    return cached.conn;
  }

  // Agar promise nahi bana hai
  if (!cached.promise) {
    cached.promise = connect(mongodbUrl).then((c) => c.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    throw error;
  }
  return cached.conn;
};

export default connectDb;
