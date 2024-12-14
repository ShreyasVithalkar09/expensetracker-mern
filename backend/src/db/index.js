import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
  } catch (error) {
    console.log(`MONGODB CONNECTION ERROR:: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
