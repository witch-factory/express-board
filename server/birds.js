import express from "express";

const router=express.Router();

router.use((res,req,next)=>{
  console.log('Time : ', Date.now());
  next();
});

router.get("/", (req, res)=>{
  res.send("Birds home");
});

router.get("/about", (req,res)=>{
  res.send("About birds");
})

export default router;