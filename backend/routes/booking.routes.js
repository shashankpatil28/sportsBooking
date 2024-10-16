import express from "express";
import {
    getAllBookings,
    getBookingsByUser,
    createBooking,
    getBookingById,
    updateBooking,
    deleteBooking
} from "../controllers/booking.controllers.js";
import { protectRoute, isManager } from "../middleware/user.middlewares.js";

const router = express.Router();
router.get("/", protectRoute, isManager, getAllBookings);
router.get("/user/:userId", protectRoute, getBookingsByUser);
router.post("/", protectRoute, createBooking);
router.get("/:bookingId", protectRoute, getBookingById);
router.put("/:bookingId", protectRoute, isManager, updateBooking);
router.delete("/:bookingId", protectRoute, deleteBooking);

export default router;
