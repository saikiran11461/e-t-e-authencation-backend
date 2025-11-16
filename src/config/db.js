require("dotenv").config();

const mongoose = require("mongoose");

const connectionDB = () =>{
    return mongoose.connect(process.env.DBURL)
}

module.exports = {connectionDB}