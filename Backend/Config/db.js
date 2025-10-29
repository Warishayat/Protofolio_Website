const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


const ConnectDB = async()=>{
    const conn=await mongoose.connect(process.env.DATABASE_URI)
    if(conn){
        console.log("Database is up.")
    }
    else{
        console.log("Database is having error")
    }
}

module.exports = ConnectDB;