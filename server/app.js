import express from "express";

const app=express();
const port=3000;

const requestTime=(req,res,next)=>{
  req.requestTime=Date.now();
  //요청의 타임스탬프를 표시
  next();
}

app.use(requestTime);

app.get('/', (req, res)=>{
  const responseText='Requested at '+req.requestTime+'';
  res.send(responseText);
})


app.listen(port);