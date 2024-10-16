import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectDB from "./db/connect.js";

import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("server is ready")
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`App is listening to port ${PORT}`); 
});