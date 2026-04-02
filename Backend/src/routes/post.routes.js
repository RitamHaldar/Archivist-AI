import { Router } from "express";
import { createPost, suggestTags, addTags, getPosts } from "../controllers/post.controller.js";
import { Identifyuser } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @description Create a new post
 * @route POST /api/posts/create
 * @access private
 */
router.post("/create", Identifyuser, createPost);

/**
 * @description Suggest tags for content
 * @route POST /api/posts/suggest-tags
 * @access private
 */
router.post("/suggest-tags", Identifyuser, suggestTags);

/**
 * @description Add tags to an existing post
 * @route POST /api/posts/add-tags
 * @access private
 */
router.post("/add-tags", Identifyuser, addTags);

/**
 * @description Get all posts for the authenticated user
 * @route GET /api/posts/get-posts
 * @access private
 */
router.get("/get-posts", Identifyuser, getPosts);

export default router;
