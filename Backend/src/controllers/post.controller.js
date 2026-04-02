import { postModel } from "../models/post.model.js";
import { generateTags, generateSummary, generateTitle } from "../services/ai.service.js";

export async function createPost(req, res) {
    const { url, type } = req.body
    const summary = await generateSummary(url)
    const title = await generateTitle(url)
    const post = await postModel.create({ user: req.user.id, title, summary, url, type })
    return res.status(201).json({ message: "Post created successfully", post })
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