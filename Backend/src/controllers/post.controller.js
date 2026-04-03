import { postModel } from "../models/post.model.js";
import { generateTags, generateSummary, generateTitle, generateEmbedding } from "../services/ai.service.js";
import { imagetextExtractorandUpload, pdftextExtractor } from "../services/reader.service.js";
import { uploadFile } from "../services/imageupload.service.js";

export async function createPost(req, res) {
    const { url, type } = req.body
    const file = req.file
    let post = null, summary = null, title = null, text = null
    if (file) {
        const buffer = file.buffer
        if (file.mimetype.startsWith("image")) {
            text = await imagetextExtractorandUpload(buffer)
        }
        else {
            text = await pdftextExtractor(buffer)
        }
        const url = await uploadFile(file)
        summary = await generateSummary(text)
        title = await generateTitle(text)
        console.log(title)
        post = await postModel.create({ user: req.user.id, title, summary, url, type })
    } else {
        summary = await generateSummary(url)
        title = await generateTitle(url)
        post = await postModel.create({ user: req.user.id, title, summary, url, type })

    }
    const embedding = await generateEmbedding(title + " " + summary + " " + text)
    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

export async function suggestTags(req, res) {
    const { url } = req.body
    const tags = await generateTags(url)
    return res.status(200).json({ message: "Tags suggested successfully", tags })
}

export async function addTags(req, res) {
    const { postId, tags } = req.body
    const post = await postModel.findById(postId)
    post.tags.push(...tags)
    await post.save()
    return res.status(200).json({ message: "Tags added successfully", post })
}

export async function getPosts(req, res) {
    const posts = await postModel.find({ user: req.user.id })
    return res.status(200).json({ message: "Posts fetched successfully", posts })
}