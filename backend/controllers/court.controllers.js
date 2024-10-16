import Court from "../models/court.models.js";
import Sport from "../models/sport.models.js";

export const getAllCourtsForSport = async (req, res) => {
    const { sportId } = req.params;

    try {
        const sport = await Sport.findById(sportId).populate("courts");

        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        const courts = sport.courts;
        res.status(200).json(courts);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not retrieve courts" });
    }
};

export const addCourtToSport = async (req, res) => {
    const { sportId } = req.params;
    const { startTime } = req.body;

    try {
        const sport = await Sport.findById(sportId);

        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        const newCourt = new Court({
            startTime,
            sport: sportId
        });

        const savedCourt = await newCourt.save();

        // Add the new court to the sport's courts array
        sport.courts.push(savedCourt._id);
        await sport.save();

        res.status(201).json(savedCourt);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not add court" });
    }
};

export const getCourtById = async (req, res) => {
    const { sportId, courtId } = req.params;

    try {
        const court = await Court.findOne({ _id: courtId, sport: sportId });

        if (!court) {
            return res.status(404).json({ message: "Court not found" });
        }

        res.status(200).json(court);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not retrieve court details" });
    }
};

export const updateCourtInSport = async (req, res) => {
    const { sportId, courtId } = req.params;
    const { startTime } = req.body;

    try {
        const court = await Court.findOne({ _id: courtId, sport: sportId });

        if (!court) {
            return res.status(404).json({ message: "Court not found" });
        }

        // Update fields if provided
        if (startTime) court.startTime = startTime;

        const updatedCourt = await court.saveZ();
        res.status(200).json(updatedCourt);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not update court" });
    }
};

export const deleteCourtFromSport = async (req, res) => {
    const { sportId, courtId } = req.params;

    try {
        const court = await Court.findOne({ _id: courtId, sport: sportId });

        if (!court) {
            return res.status(404).json({ message: "Court not found" });
        }

        // Remove court from sport's courts array
        await Sport.findByIdAndUpdate(sportId, { $pull: { courts: courtId } });

        // Delete the court
        await court.remove();

        res.status(200).json({ message: "Court deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not delete court" });
    }
};
