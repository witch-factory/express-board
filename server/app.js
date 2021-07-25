import express from "express";
import birds from "./birds.js";

const app=express();
const port=3000;

app.get('/', (req, res)=>{
  res.send('Hello World');
})

app.use('/birds', birds);

app.listen(port, ()=>{
  console.log(`example in localhost ${port}`);
})