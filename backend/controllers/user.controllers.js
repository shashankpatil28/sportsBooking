import User from "../models/user.models.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");  // Don't return passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not retrieve users" });
    }
};

export const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select("-password");  // Don't return passwords

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not retrieve user details" });
    }
};

export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, role } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields if provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not update user" });
    }
};

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.remove();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error: Could not delete user" });
    }
};
