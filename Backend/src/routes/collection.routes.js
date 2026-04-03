import { Router } from "express";
import { getCollections } from "../controllers/collection.controller.js";
import { Identifyuser } from "../middlewares/auth.middleware.js";

const collectionRouter = Router();

/**
 * @description Get all collections for the authenticated user
 * @route GET /api/collections/get-collections
 * @access private
 */
collectionRouter.get("/get-collections", Identifyuser, getCollections);

export default collectionRouter;