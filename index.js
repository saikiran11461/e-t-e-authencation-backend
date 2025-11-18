
const express = require("express");
const { connectionDB } = require("./src/config/db");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const {userRouter} = require("./src/routes/user.routes");
const { taskRouter } = require("./src/routes/task.routes");
require("dotenv").config()
const app = express();

app.use(express.json())

app.use(cors({
origin: "https://e-t-e-authencation-frontend.vercel.app",  
  credentials: true,      
}))

app.use(cookieParser());

app.use("/users",userRouter);
app.use("/tasks", taskRouter)

app.listen(process.env.PORT ||" 0.0.0.0 " , ()=>{
    try {
       connectionDB()
       console.log("connected on the port ", process.env.PORT)
    } catch (error) {
       console.log("failed to connect db", error)
    }
})