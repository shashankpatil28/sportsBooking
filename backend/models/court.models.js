import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
    startTime: {  // Changed from timeStart to startTime for consistency
        type: Date,
        required: true
    },
    sport: {  // Fixed typo: changed sports to sport for singular reference
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sport",
        required: true
    },
},{ timestamps: true });

const Court = mongoose.model("Court", courtSchema);

export default Court;
