const mongoose = require("mongoose")
const mongoURI = process.env.DBUri || "mongodb://127.0.0.1/AuthStack"
const dbConnect = async ()=>{
    try {
        await mongoose.connect(mongoURI)
        console.log("Database Connected Successfully...")
    } catch (e) {
        console.log(e)
    }
}

module.exports = dbConnect