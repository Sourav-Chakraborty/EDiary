//connecting to mongodb database server
const mongoose=require('mongoose')

//take the url from compass by manually filling the field
const mongoURI="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("mongodb connected")
    })
}

module.exports=connectToMongo