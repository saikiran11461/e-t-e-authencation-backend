
const jwt = require("jsonwebtoken");
require("dotenv").config();


 const accessToken = (id) =>{
   return jwt.sign({id:id}, process.env.SECRETKEY, {expiresIn:"5h"});
}


const refreshTokens = (id)=>{
    return jwt.sign({id:id}, process.env.REFRESH_SECRETKEY, {expiresIn:"10h"})
}




module.exports = {accessToken, refreshTokens}