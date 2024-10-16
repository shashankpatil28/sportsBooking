import Booking from "../models/booking.models.js";
import Court from "../models/court.models.js";

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("court").populate("user");  // Changed courtName to court
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error retrieving bookings: ", error);
        res.status(500).json({ message: "Server error: Could not retrieve bookings" });
    }
};

export const getBookingsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ user: userId }).populate("court");  // Changed courtName to court

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error retrieving user's bookings: ", error);
        res.status(500).json({ message: "Server error: Could not retrieve bookings" });
    }
};

export const createBooking = async (req, res) => {
    const { court, timeStart } = req.body;

    try {
        // Ensure time slot is 60 minutes long
        const timeSlotEnd = new Date(timeStart);
        timeSlotEnd.setHours(timeSlotEnd.getHours() + 1); // Add 60 minutes

        // Ensure timeStart is in the future
        if (new Date(timeStart) < new Date()) {
            return res.status(400).json({ message: "Time start must be in the future" });
        }

        const courtEntity = await Court.findById(court);

        if (!courtEntity) {
            return res.status(404).json({ message: "Court not found" });
        }

        // Check if there's an existing booking at the same time
        const existingBooking = await Booking.findOne({ court, timeStart });
        if (existingBooking) {
            return res.status(400).json({ message: "This court is already booked for the selected time slot" });
        }

        const newBooking = new Booking({
            user: req.user._id,
            court,
            timeStart,
            timeEnd: timeSlotEnd // Store end time
        });

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error("Error creating booking: ", error);
        res.status(500).json({ message: "Server error: Could not create booking" });
    }
};

export const getBookingById = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId).populate("court").populate("user");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.error("Error retrieving booking details: ", error);
        res.status(500).json({ message: "Server error: Could not retrieve booking details" });
    }
};


export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { court, timeStart } = req.body;

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (court) {
            const courtEntity = await Court.findById(court);
            if (!courtEntity) {
                return res.status(404).json({ message: "Court not found" });
            }
            booking.court = court;
        }

        if (timeStart) {
            // Ensure timeStart is in the future
            if (new Date(timeStart) < new Date()) {
                return res.status(400).json({ message: "Time start must be in the future" });
            }

            // Check if the new time slot is available (excluding current booking)
            const existingBooking = await Booking.findOne({ court, timeStart, _id: { $ne: bookingId } });
            if (existingBooking) {
                return res.status(400).json({ message: "This court is already booked for the selected time slot" });
            }
            booking.timeStart = timeStart;
        }

        const updatedBooking = await booking.save();
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking: ", error);
        res.status(500).json({ message: "Server error: Could not update booking" });
    }
};

export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Allow users to delete their own bookings or managers to delete any booking
        if (req.user.role !== "manager" && booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this booking" });
        }

        await booking.remove();
        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        console.error("Error deleting booking: ", error);
        res.status(500).json({ message: "Server error: Could not delete booking" });
    }
};
