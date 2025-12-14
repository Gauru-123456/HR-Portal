import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.log("❌ MongoDB connection error:", error);
    }
};

export default connectToDatabase;



//To get mongodb connection url go to mongodb compass go to local click the right 
// click of mouse then 
// select copy connection string option to see the mongodb url go .env file