import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const isCustomer = (req, res, next) => {
    if (req.user && req.user.role === "user") {
        next();  // Proceed if the user has the role "user"
    } else {
        return res.status(403).json({ error: "Forbidden - You do not have permission to access this resource" });
    }
};

const isManager = (req, res, next) => {
    if (req.user && req.user.role === "manager") {
        next();  // Proceed if the user has the role "manager"
    } else {
        return res.status(403).json({ error: "Forbidden - You do not have permission to access this resource" });
    }
};



export { protectRoute, isCustomer, isManager};