
const jwt = require("jsonwebtoken");
require("dotenv").config();


 const accessToken = (id) =>{
   return jwt.sign({id:id}, process.env.SECRETKEY, {expiresIn:60});
}


const refreshTokens = (id)=>{
    return jwt.sign({id:id}, process.env.REFRESH_SECRETKEY, {expiresIn:180})
}




module.exports = {accessToken, refreshTokens}