require("dotenv").config()
const mongoose = require("mongoose");

const connectDB = async ()=> {
    try{
        console.log("Conneting database.....")
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database!");
    }catch(error){
        console.error(error);
    }
}

module.exports = { connectDB };