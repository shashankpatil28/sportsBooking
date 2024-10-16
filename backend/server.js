import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import centreRoutes from "./routes/centre.routes.js"
import sportRoutes from "./routes/sport.routes.js"
import courtRoutes from "./routes/court.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import userRoutes from "./routes/booking.routes.js"
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
app.use("/api/centers", centreRoutes)
app.use("/api/centers/sports", sportRoutes)
app.use("/api/sports/courts", courtRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/users", userRoutes)


app.listen(PORT, () => {
    connectDB();
    console.log(`App is listening to port ${PORT}`); 
});