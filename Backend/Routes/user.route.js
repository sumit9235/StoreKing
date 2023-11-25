const express=require('express')
require("dotenv").config();
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken");
const { UserModel } = require('../Models/user.model');
const userRouter=express.Router()


userRouter.post("/signup",async(req,res)=>{

    const {name,email,password}=req.body;

    try {
        bcrypt.hash(password,4,async(err,hash)=>{
            if(err){
                res.send(err.message)
            }else{
                const user= new UserModel({name,email,password:hash})
                await user.save();
                res.send({"msg":"New user has been registered"})
            }
        })
    } catch (err) {
        res.send({"msg":"Something went wrong while registering"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
            console.log(user)
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user[0]._id},"SecretKey")
                    res.send({"msg":"User logged in succesfull","token":token})
                }else{
                    res.send({"msg":"Wrong credentials"})
                }
            })
        }else{
            res.send({"msg":"User not found"})
        }
    } catch (err) {
        res.send({"msg":"Someting went wrong","err":err.message})
    }
})

module.exports={
    userRouter
}