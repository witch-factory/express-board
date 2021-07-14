import express from "express";
import mysql from "../db/mysql.js";

const router=express.Router();

router.post("/new", (req, res)=>{
  console.log(req.body);
  return res.json({
    success:"ok"
  })
})

export default router;