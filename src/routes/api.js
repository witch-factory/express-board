import express from "express";
import post from "./post.js";
import auth from "./auth.js";

const router=express.Router();

router.use("/post", post);
router.use("/auth", auth);

export default router;