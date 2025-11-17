const jwt = require("jsonwebtoken")

require("dotenv").config()

const authentication = (req,res,next) =>{
   const token = req.cookies.accessToken;   

    if(!token) return res.status(200).send({message:"cookies  are missing"});

    jwt.verify(token,process.env.SECRETKEY, (err,decoded)=>{
         if (err) {
                return res.status(401).send({ error: "Invalid or expired token. Please login again." });
            }
           
            req.user = decoded.id;
      
            next();
    })
}


module.exports = {authentication}