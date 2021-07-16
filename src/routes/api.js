import express from "express";
import post from "./post.js";
import auth from "./auth.js";
import board from "./board.js";
import boardlist from "./boardlist.js";

const router=express.Router();

router.use("/post", post);
router.use("/auth", auth);
router.use("/board", board);
router.use("/boardlist", boardlist);

export default router;