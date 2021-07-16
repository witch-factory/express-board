import express from "express";
import mysql from "../db/mysql.js";

const router=express.Router();

router.get("/", (req, res)=>{
  if(!req.session.token){
    return res.json({
      ok:false,
      status:404,
      error:"unauthorized user"
    });
  }
  const sqlQuery=`select b.id, b.title, b.content, u.username from board as b inner join user as u on b.writer=u.id limit 100`;
  //게시판 글을 100개까지 불러옴

  mysql.query(sqlQuery, (err, results, fields)=>{
    if(err){
      console.log(err);
      return res.json({
        ok:false,
        status:400,
        error:"db error"
      });
    }

    const boardlist=results;
    //불러온 글들 리스트
    return res.json({
      boardlist
    });
  });
});

export default router;