import express from "express";
import {
    getAllSportsInCenter,
    addSportToCenter,
    getSportInCenterById,
    updateSportInCenter,
    deleteSportFromCenter
} from "../controllers/sport.controllers.js";
import { protectRoute, isManager } from "../middleware/user.middlewares.js";

const router = express.Router();

router.get("/:centerId", getAllSportsInCenter);
router.post("/:centerId", protectRoute, isManager, addSportToCenter);
router.get("/:centerId/:sportId", getSportInCenterById);
router.put("/:centerId/:sportId", protectRoute, isManager, updateSportInCenter);
router.delete("/:centerId/:sportId", protectRoute, isManager, deleteSportFromCenter);

export default router;
