import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        // Try MongoDB Atlas first, fallback to local
        const connectionString = process.env.MONGODB_ATLAS_CONNECTION_STRING || process.env.MONGODB_URL;
        await mongoose.connect(connectionString);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.log("❌ MongoDB connection error:", error.message);
        console.log("💡 Trying local MongoDB...");
        try {
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("✅ Connected to Local MongoDB");
        } catch (localError) {
            console.log("❌ Local MongoDB also failed:", localError.message);
        }
    }
};

export default connectToDatabase;



//To get mongodb connection url go to mongodb compass go to local click the right 
// click of mouse then 
// select copy connection string option to see the mongodb url go .env file