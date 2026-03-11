import mongoose from "mongoose";
import User from "../models/user.Model.js";

export default async function getAllUsers(req, res) {

    const store_id = req.params?.store_id || null;

    // Check if parameter exists
    if (!store_id) {
        return res.status(400).json({
            status: "ERROR",
            message: "Missing required parameter",
            required: ["store_id"]
        });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(store_id)) {
        return res.status(400).json({
            status: "ERROR",
            message: "Invalid store_id format"
        });
    }

    try {

        const users = await User.find({ store_id }).select("-password");

        return res.status(200).json({
            status: "SUCCESS",
            message: "Users fetched successfully",
            payLoad: users
        });

    } catch (error) {

        console.error(`Error fetching users: ${error}`);

        return res.status(500).json({
            status: "ERROR",
            message: "Failed to fetch users",
            error: error.message
        });
    }
}