import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    center: {  // Renamed from "centre" to "center" for consistency
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center",
        required: true
    },
    courts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Court"
            // No "required: true" here, courts are optional initially
        }
    ]
}, { timestamps: true });

const Sport = mongoose.model("Sport", sportSchema);

export default Sport;
