import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import cookieParser from "cookie-parser";
import collectionRoutes from "./routes/collection.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/collections", collectionRoutes);


export default app;

