import express from "express";
import {
    getAllCourtsForSport,
    addCourtToSport,
    getCourtById,
    updateCourtInSport,
    deleteCourtFromSport
} from "../controllers/court.controllers.js";
import { protectRoute, isManager } from "../middleware/user.middlewares.js";

const router = express.Router();

router.get("/:sportId", getAllCourtsForSport);
router.post("/:sportId", protectRoute, isManager, addCourtToSport);
router.get("/:sportId/:courtId", getCourtById);
router.put("/:sportId/:courtId", protectRoute, isManager, updateCourtInSport);
router.delete("/:sportId/:courtId", protectRoute, isManager, deleteCourtFromSport);

export default router;
