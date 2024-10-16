import express from "express";
const router = express.Router();


import {
  getAllCenters,
  createCenter,
  getCenterById,
  updateCenter,
  deleteCenter,
} from "../controllers/centre.controllers.js";

import { protectRoute, isManager } from "../middleware/user.middlewares.js";

router.get("/", protectRoute, getAllCenters);
router.post("/", protectRoute, isManager, createCenter);
router.get("/:centerId", protectRoute, getCenterById);
router.put("/:centerId", protectRoute, isManager, updateCenter);
router.delete("/:centerId", protectRoute, isManager, deleteCenter);


export default router;
