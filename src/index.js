import express from "express";
import bodyParser from "body-parser";
import api from "./routes/api.js";
import conn from "./db/mysql.js";
import session from "express-session";
import session_store_opts from "./session/options.js";
import expressMySQLSession from "express-mysql-session";

const MySQLStore=expressMySQLSession(session);

const app=express();
const sessionStore=new MySQLStore(session_store_opts);

let PORT=8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key:'session-cookie-name',
    secret:'session-cookie-secret',
    store:sessionStore,
    resave:false,
    saveUninitialized:false
  })
);
app.use("/api", api);

let sqlQuery="select * from user";

conn.query(sqlQuery, (err,results,fields)=>{
  if(err){console.log(err);}
  console.log(results);
});

app.get("/test", (req, res)=>{
  req.session.test=1;
  console.log(req.body);
  return res.json({
    session:req.session.test
  })
})

app.listen(PORT, ()=>{
  console.log("Express listening on port", PORT);
});
