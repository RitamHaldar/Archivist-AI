import { Router } from "express";
import { createPost, getPosts, semanticSearch } from "../controllers/post.controller.js";
import { Identifyuser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

/**
 * @description Create a new post
 * @route POST /api/posts/create
 * @access private
 */
router.post("/create", Identifyuser, upload.single("file"), createPost);

/**
 * @description Suggest tags for content
 * @route POST /api/posts/suggest-tags
 * @access private
 */
//router.post("/suggest-tags", Identifyuser, suggestTags);

/**
 * @description Add tags to an existing post
 * @route POST /api/posts/add-tags
 * @access private
 */
//router.post("/add-tags", Identifyuser, addTags);

/**
 * @description Get all posts for the authenticated user
 * @route GET /api/posts/get-posts
 * @access private
 */
router.get("/get-posts", Identifyuser, getPosts);

/**
 * @description Semantic search for posts
 * @route POST /api/posts/semantic-search
 * @access private
 */
router.post("/semantic-search", Identifyuser, semanticSearch);

export default router;
