import express from "express";
import bodyParser from "body-parser";
import api from "./routes/api.js";
import session from "express-session";
import session_store_opts from "./session/storeOptions.js";
import expressMySQLSession from "express-mysql-session";
import path from 'path';

const __dirname=path.resolve();
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

app.use("/", express.static(__dirname+"../../client/build"));
//클라이언트 빌드를 정적 파일로 지정

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
