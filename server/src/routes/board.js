import express from "express";
import mysql from "../db/mysql.js";

const router=express.Router();

router.get("/:id", (req, res)=>{
  if(!req.session.token){
    return res.json({
      ok:false,
      status:404,
      error:"unauthorized author"
    });
  }

  const bbsID=req.params.id;
  const sqlQuery="select b.id, b.title, b.content, u.username " +
    "from board as b inner join user as u on b.writer=u.id where b.id=?";

  const post=[bbsID];

  mysql.query(sqlQuery, post, (err,results,fields)=>{
    if(err){
      console.log(err);
      return res.json({
        ok:false,
        status:400,
        error:"db error"
      })
    }

    const board=results[0];
    const sqlQuery="select c.id, c.message, u.username " +
      "from comment as c inner join user as u on c.writer=u.id" +
      "inner join board as b on c.board=b.id where b.id=?";

    const post=[bbsID];

    mysql.query(sqlQuery, post, (err,results, fields)=>{
      if(err){
        console.log(err);
        return res.json({
          ok:false,
          status:400,
          error:"db error 2 in comment query"
        });
      }

      const comments=results;
      return res.json({
        board,
        comments
      })
    })
  })
})

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