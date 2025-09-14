import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/assignment8",{serverSelectionTimeoutMS:2000})
        console.log("✅ connected to mongoDB");
    } catch (error) {
        console.error({message : "❌ DB connection Error" , stack : error.stack});
        
    }
}
