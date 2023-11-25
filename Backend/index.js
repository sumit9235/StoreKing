const express = require('express')
const { userRouter } = require('./Routes/user.route')
const { connection } = require('./config/db')
const { dataRouter } = require('./Routes/data.route')
const { auth } = require('./Middleware/auth')
const cors= require('cors')
const server=express()
server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }));

server.get("/",(req,res)=>{
    res.send("Welcome to Data management system")
})

server.use("/users",userRouter)
server.use(auth)
server.use("/data",dataRouter)

server.listen(4500,async()=>{
    try {
        await connection
        console.log("Connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Connected to server")
})