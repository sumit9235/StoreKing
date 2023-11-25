const mongoose=require('mongoose')
const connection=mongoose.connect("mongodb+srv://sumit:sumit@cluster0.iiv0gzv.mongodb.net/Uploader?retryWrites=true&w=majority")
module.exports={
    connection
}