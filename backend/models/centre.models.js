import mongoose from "mongoose";

const centerSchema = new mongoose.Schema({
    centerName: {  // Renamed from "name" to "centerName" for consistency
        type: String,
        required: true
    },
    sports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sport",
        }
    ],
}, { timestamps: true });

const Center = mongoose.model("Center", centerSchema);
export default Center;