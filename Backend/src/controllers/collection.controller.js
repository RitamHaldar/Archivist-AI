import { collectionModel } from "../models/collection.model.js";

export async function getCollections(req, res) {
    const collections = await collectionModel.find({ user: req.user.id })
    return res.status(200).json({ message: "Collections fetched successfully", collections })
}
