import express from "express";
import mysql from "../db/mysql.js";

const router=express.Router();

router.post("/new", (req, res)=>{
  console.log(req.body);

  const username=req.body.username;
  const password=req.body.password;

  let sqlQuery=`select * from user where username=?`;
  //username 중복인지 확인

  const post=[username];

  mysql.query(sqlQuery, post, (err, results, fields)=>{
    if(err){
      console.log(err);
      return res.json({
        ok:false,
        error:"db error",
        status:400
      });
    }
    else{
      if(results.length===0){
        //존재하지 않는 username일 경우 새로 추가
        let sqlQuery="insert into user(username, password) values(?,?)";
        let tempPost=[username, password];

        mysql.query(sqlQuery, tempPost, (err, results, fields)=>{
          if(err){
            //새로운 유저네임 삽입할 때 뭔가 에러 발생
            console.log(err);
            return res.json({
              ok:false,
              error:"2 db error",
              status:400
            });
          }
          else{
            return res.json({
              ok:true,
              error:null,
              status:200
            });
          }
        })
      }
      else{
        return res.json({
          ok:false,
          error:"existing username",
          status:400
        })
      }
    }
  });

});

export default router;