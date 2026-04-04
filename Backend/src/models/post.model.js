import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["url", "image", "youtube", "pdf"],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    url: {
        type: String,
        required: true
    },
    folder: {
        type: String,
        //required: true
    },
    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "folders",
        //required: true
    }
}, { timestamps: true });

export const postModel = mongoose.model("post", postSchema);

