const { userModle } = require("../models/user.model")
var jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { accessToken, refreshTokens } = require("../config/jwtToken");
require("dotenv").config()

const userController = {

    getUsers: async (req,res)=>{
        console.log("cookies ",req.cookies)
        try {
            const users = await userModle.find();
            return res.status(200).send({message:"succes", users})
        } catch (error) {
            return res.status(500).send(error)
        }
    },

    register : async(req,res)=>{
        const {name,email,password} = req.body;
        try {
            let users =await userModle.findOne({email});
            if(users) return res.status(400).send({message:"email is alredy exist"})

           let hashPassword = await  bcrypt.hash(password , 10)
            const newUser = new userModle({
                name:name,
                email:email,
                password: hashPassword
            })

            newUser.save()

            return res.status(201).send({message:"user created sucess"})


        } catch (error) {
            return res.status(500).send({message:error})
        }
    },

    login:async(req,res)=>{
        const {email,password} = req.body
        try {
            let users = await userModle.findOne({email});
            console.log(users)
            
            if(!users) return res.status(401).send({message:"user not found"})
            
            let comparePassword =await bcrypt.compare(password , users.password)

           if(!comparePassword){
            return res.status(401).send({ message: "user email or password wrong" });
           }

           let token = accessToken(users.id);
           let refreshToken = refreshTokens(users.id)

           res.cookie("accessToken", token, {
            httpOnly:true,
            secure: false,       
            sameSite: "lax",
            maxAge: 7 * 60 * 60 * 1000

           })

            res.cookie("refreshToken", refreshToken, {
            httpOnly:true,
            secure: false,       
            sameSite: "lax",
            maxAge: 7 * 60 * 60 * 1000

           })

           return res.status(200).send({message:"success login"})

        } catch (error) {
            return res.status(500).send(error.message)
        }
    },


    refreshToken: async(req,res)=>{
        try {
            let verifyCookieToken =  req.cookies.refreshToken;
            if(!verifyCookieToken) return res.status(401).send({message:"no token was found"})
            
            let token = jwt.verify(verifyCookieToken, process.env.REFRESH_SECRETKEY)

            if(!token) return res.status(401).send({message:"token is not valid "})

            let newToken = accessToken(token._id);

             res.cookie("accessToken", newToken,{
                httpOnly:true,
                secure: false,       
                sameSite: "lax",
                expireIn:7*60*60*1000
            })

            return res.status(201).send({message:"new token was generated"})
        } catch (error) {
            return res.status(500).send(error.message)
        }
    },

    checkAuth:async(req,res)=>{
        try {
            res.status(200).send({authenticated: true, user:req.user.id})
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }

}

module.exports = {userController}