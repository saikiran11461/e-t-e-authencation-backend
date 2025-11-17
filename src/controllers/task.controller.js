const { taskModal } = require("../models/task.modal")

const taskController = {
    getTask: async(req,res)=>{
        try {
            let task = await taskModal.find();
            return res.status(200).send(task)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },

    getSingleTask:async(req,res)=>{
        console.log("params",req.params)
        try {
            let task = await taskModal.findById(req.params.id);
            return res.status(200).send(task)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },

    createTask:async(req,res)=>{
         let userId = req.user
        try {
            let tasks = {...req.body , userId}
            let task = await taskModal.create(tasks);
            return res.status(201).send(task)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },
    patchTask:async(req,res)=>{
        try {
            let task = await taskModal.findByIdAndUpdate(req.params.id, req.body , {new:true});
            return res.status(202).send(task)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },

    deleteTask:async(req,res)=>{
        try {
            let task = await taskModal.findByIdAndDelete(req.params.id);
            return res.status(203).send({message:"deleted success"})
        } catch (error) {
            
        }
    }
}


module.exports = {taskController}