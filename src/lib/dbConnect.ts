import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    connection.isConnected = db.connections[0].readyState;

    console.log("\x1b[34m%s\x1b[0m", "Connected to DB successfully");
  } catch (error) {
    console.log("Error connecting to DB", error);
    process.exit(1);
  }
}

export default dbConnect;
