import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected");
      return false;
      
    }
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("MongoDB connected successfully...");
    return true;
  } catch (error: any) {
    console.log("Not connected to DB");
    console.log(error?.message);
    return false;
  }
};

export const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log("MongoDB is already disconnected");
      return false;
    }

    await mongoose.disconnect();
    console.log("Database connection closed!");
    return true;
  } catch (error: any) {
    console.log("Unable to disconnect from DB");
    console.log(error?.message);
    return false;
  }
};
