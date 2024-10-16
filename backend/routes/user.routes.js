import express from "express";
const router = express.Router();

import { getUsersForSideBar  } from "../controllers/user.controllers.js";
import protectRoute from "../middleware/protectRoute.js";
router.get("/", protectRoute, getUsersForSideBar);

export default router