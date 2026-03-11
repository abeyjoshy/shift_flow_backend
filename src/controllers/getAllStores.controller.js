import Store from "../models/store.Model.js";

export default async function getAllStores(req, res) {
    try {
        const stores = await Store.find({}).select("-password");

        return res.status(200).json({
            status: "SUCCESS",
            message: "Store details fetched successfully",
            payLoad: stores
        });
    } catch (error) {
        console.error(`Error fetching store details: ${error}`);

        return res.status(500).json({
            status: "ERROR",
            message: "Failed to fetch store details",
            error: error.message
        });
    }
}