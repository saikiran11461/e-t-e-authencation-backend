const express = require("express")

const {taskController} = require("../controllers/task.controller");
const {authentication} = require("../middlewares/auth.middleware");

const taskRouter = express.Router();

taskRouter.get("/", taskController.getTask);
taskRouter.get("/:id" , taskController.getSingleTask);
taskRouter.post("/create", authentication, taskController.createTask);
taskRouter.patch("/:id", authentication, taskController.patchTask);
taskRouter.delete("/:id", authentication, taskController.deleteTask)

module.exports = {taskRouter}