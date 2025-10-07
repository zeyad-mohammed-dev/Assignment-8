import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{serverSelectionTimeoutMS:2000})
        console.log("✅ connected to mongoDB");
    } catch (error) {
        console.error({message : "❌ DB connection Error" , stack : error.stack});
        
    }
}
