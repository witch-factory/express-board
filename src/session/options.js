import dotenv from "dotenv";

dotenv.config();

const options={
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
};

export default options;