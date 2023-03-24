const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

const connection = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected successfully")
    }catch(error){
        console.log(error)
    }
}


module.exports = connection;