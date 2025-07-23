import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongoose connected to ${conn.connection.host}`);
        console.log(conn.connection.name);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}
