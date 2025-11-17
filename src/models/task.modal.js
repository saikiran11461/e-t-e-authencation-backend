const mongoose = require("mongoose");

const taskSchema  = new mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String, require:true},
    status:{type:String,require:false},
    dueDate:{type:String,require:true},
    updatedAt:{type:String,require:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"users"}
},{
    timestamps:true,
    versionKey:false
})

const taskModal = mongoose.model("task", taskSchema);

module.exports = {taskModal}