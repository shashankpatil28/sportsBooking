import Center from "../models/centre.models.js";

export const getAllCenters = async (req, res) => {
    try {
        const centers = await Center.find().populate("sports");  // Populate sports field if needed
        res.status(200).json(centers);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not fetch centers" });
    }
};

export const createCenter = async (req, res) => {
    const { centerName } = req.body;  // Consistent with schema

    try {
        const newCenter = new Center({
            centerName,
            sports: []  // Initialize sports as an empty array
        });

        const savedCenter = await newCenter.save();
        res.status(201).json(savedCenter);
    } catch (error) {
        console.error("Error creating center: ", error);
        res.status(500).json({ message: "Server error: Could not create center" });
    }
};

export const getCenterById = async (req, res) => {
    const { centerId } = req.params;

    try {
        const center = await Center.findById(centerId).populate("sports");  // Populate sports field if needed

        if (!center) {
            return res.status(404).json({ message: "Center not found" });
        }

        res.status(200).json(center);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not fetch center details" });
    }
};

export const updateCenter = async (req, res) => {
    const { centerId } = req.params;
    const { centerName, sports } = req.body;

    try {
        let center = await Center.findById(centerId);

        if (!center) {
            return res.status(404).json({ message: "Center not found" });
        }

        // Update fields if provided
        if (centerName) center.centerName = centerName;

        if (centerName && centerName.trim() !== "") {
            center.centerName = centerName;
        }
        
        // Append new sports to the existing list (optional)
        if (sports) {
            center.sports = [...new Set([...center.sports, ...sports])];  // Avoid duplicates
        }

        const updatedCenter = await center.save();
        res.status(200).json(updatedCenter);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not update center" });
    }
};

export const deleteCenter = async (req, res) => {
    const { centerId } = req.params;

    try {
        const center = await Center.findById(centerId);

        if (!center) {
            return res.status(404).json({ message: "Center not found" });
        }

        // Check if there are dependencies such as sports or bookings before deletion

        await center.remove();  // Remove the center
        res.status(200).json({ message: "Center deleted successfully" });
    } catch (error) {
        console.error("Error deleting center: ", error);
        res.status(500).json({ message: "Server error: Could not delete center" });
    }
};



