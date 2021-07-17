import express from "express";
import mysql from "../db/mysql.js";

const router=express.Router();

router.post("/:id", (req,res)=>{
  if(!req.session.token){
    return res.json({
      ok:false,
      status:404,
      error:"unauthorized user"
    });
  }
  const userID=req.session.token;
  const bbsID=req.params.id;
  const message=req.body.message;

  const sqlQuery="insert into comment(writer, board, message) values(?,?,?)";
  const post=[userID, bbsID, message];

  mysql.query(sqlQuery, post, (err, results, fields)=>{
    if(err){
      //db 불러오다가 뭔가 에러 남남
     console.log(err);
      return res.json({
        ok:false,
        status:400,
        error:"db error"
      });
    }
    return res.json({
      ok:true,
      status:200,
      error:null
    });
  });
});

export default router;