import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    centroidEmbedding: {
        type: [Number],
        default: []
    },
    itemCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const collectionModel = mongoose.model("folders", collectionSchema);
