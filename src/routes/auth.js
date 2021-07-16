import express from "express";
import mysql from "../db/mysql.js";

const router=express.Router();

router.get("/token", (req, res)=>{
  //로그인 여부 확인
  const user=req.session.token;
  const token=req.sessionID;
  return res.json({
    user:user,
    token
  });
});


router.post("/login", (req,res)=>{
  const username=req.body.username;
  const password=req.body.password;

  let sqlQuery="select password from user where username=?";
  //username 같은 데이터만 검색해서 찾아온다
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
      //에러 안뜨고 잘 불러옴
      const user_password=results[0].password;
      if(password===user_password){
        //비밀번호가 등록된 것과 같다
        req.session.token=username;
        return res.json({
          ok:true,
          error:null,
          status:200
        });
      }
      else{
        //비밀번호가 등록된 것과 다름
        return res.json({
          ok:false,
          error:"check username and password again",
          status:400
        });
      }
    }

  })
})

router.get("/logout", (req, res)=>{
  //로그아웃 만들기
  delete req.session.token;
  return res.json({
    ok:true,
    error:null,
    status:200
  });
});

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