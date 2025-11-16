
const express = require("express");
const { userController } = require("../controllers/user.controller");
const {authentication} =  require("../middlewares/auth.middleware")
const userRouter  = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login)
userRouter.get("/check-auth", authentication,  userController.checkAuth)
module.exports = {userRouter}