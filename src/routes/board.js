import express from "express";
import mysql from "../db/mysql";

const router=express.Router();

router.post("/", async(req, res)=>{
  const username=req.session.token;
  const title=req.body.title;
  const content=req.body.content;

  let sqlQuery="select id from user where username=?";
  const post=[username];

  await mysql.query(sqlQuery, post, (err, results, fields)=>{
    if(err){
      console.log(err);
      return res.json({
        ok:false,
        status:400,
        error:"db error"
      });
    }
    else{
      //에러 발생 안하면 글 쓰기
      const user_id=results[0].id;
      let sqlQuery="insert into board(title, content, writer) values (?,?,?)";
      const post=[title, content, user_id];

      mysql.query(sqlQuery, post, (err, results, fields)=>{
        if(err){
          console.log(err);
          return res.json({
            ok:false,
            status:400,
            error:"fail to write"
          });
        }
        else{
          return res.json({
            ok:false,
            status:200,
            error:null
          })
        }
      })
    }
  })
});

export default router;