import express from "express";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controllers.js";
import { protectRoute, isManager } from "../middleware/user.middlewares.js";

const router = express.Router();
router.get("/", protectRoute, isManager, getAllUsers);
router.get("/:userId", protectRoute, isManager, getUserById);
router.put("/:userId", protectRoute, isManager, updateUser);
router.delete("/:userId", protectRoute, isManager, deleteUser);

export default router;
