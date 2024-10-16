import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    court: {  // Changed courtName to court
        type: mongoose.Schema.Types.ObjectId,
        ref: "Court",
        required: true
    },
    timeStart: {
        type: Date,
        required: true
    },
    timeEnd: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
