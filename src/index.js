import express from "express";
import bodyParser from "body-parser";
import api from "./routes/api.js";
import conn from "./db/mysql.js";

const app=express();
let PORT=8080;

app.use(bodyParser.json());

app.use("/api", api);

let sqlQuery="select * from user";

conn.query(sqlQuery, (err,results,fields)=>{
  if(err){console.log(err);}
  console.log(results);
});

app.listen(PORT, ()=>{
  console.log("Express listening on port", PORT);
});
