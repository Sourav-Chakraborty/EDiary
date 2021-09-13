//connecting to mongodb database server
const mongoose=require('mongoose')

//take the url from compass by manually filling the field
const mongoURI="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=falsemongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongodb")
    })
}

module.exports=connectToMongo