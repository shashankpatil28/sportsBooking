import Sport from "../models/sport.models.js";
import Center from "../models/centre.models.js";

export const getAllSportsInCenter = async (req, res) => {
    const { centerId } = req.params;

    try {
        const center = await Center.findById(centerId).populate("sports");

        if (!center) {
            return res.status(404).json({ message: "Center not found" });
        }

        const sports = center.sports;
        res.status(200).json(sports);
    } catch (error) {
        console.error("Error retrieving sports: ", error);
        res.status(500).json({ message: "Server error: Could not retrieve sports" });
    }
};

export const addSportToCenter = async (req, res) => {
    const { centerId } = req.params;
    const { name } = req.body;

    try {
        const center = await Center.findById(centerId);
        if (!center) {
            return res.status(404).json({ message: "Center not found" });
        }

        const newSport = new Sport({
            name,
            center: centerId,  // Renamed "centre" to "center" for consistency
            courts: []  // Initialize courts as an empty array
        });

        const savedSport = await newSport.save();

        // Add the new sport to the center's sports array
        center.sports.push(savedSport._id);
        await center.save();

        res.status(201).json(savedSport);
    } catch (error) {
        console.error("Error adding sport: ", error);
        res.status(500).json({ message: "Server error: Could not add sport" });
    }
};


export const getSportInCenterById = async (req, res) => {
    const { centerId, sportId } = req.params;

    try {
        const sport = await Sport.findOne({ _id: sportId, center: centerId }).populate("courts");

        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        res.status(200).json(sport);
    } catch (error) {
        console.error("Error retrieving sport details: ", error);
        res.status(500).json({ message: "Server error: Could not retrieve sport details" });
    }
};

export const updateSportInCenter = async (req, res) => {
    const { centerId, sportId } = req.params;
    const { name } = req.body;

    try {
        const sport = await Sport.findOne({ _id: sportId, center: centerId });

        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        // Update name if provided
        if (name) sport.name = name;

        const updatedSport = await sport.save();
        res.status(200).json(updatedSport);
    } catch (error) {
        console.error("Error updating sport: ", error);
        res.status(500).json({ message: "Server error: Could not update sport" });
    }
};

export const deleteSportFromCenter = async (req, res) => {
    const { centerId, sportId } = req.params;

    try {
        const sport = await Sport.findOne({ _id: sportId, center: centerId });

        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        // Remove the sport from the center's sports array
        await Center.findByIdAndUpdate(centerId, { $pull: { sports: sportId } });

        // Delete the sport
        await sport.remove();

        res.status(200).json({ message: "Sport deleted successfully" });
    } catch (error) {
        console.error("Error deleting sport: ", error);
        res.status(500).json({ message: "Server error: Could not delete sport" });
    }
};

