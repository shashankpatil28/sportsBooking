import mongoose from "mongoose"

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "chat-app-db"
        });
        console.log("Connected to MongoDB !!!");
    } catch (error) {
        console.log("Error connecting to MongoDb !!! : ", error.message )
    }
}

export default connectDB;