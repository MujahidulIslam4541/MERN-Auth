import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection problem:", error.message);
    process.exit(1); //exit process if there is a problem with the database connection
  }
};

export default connectDB;
