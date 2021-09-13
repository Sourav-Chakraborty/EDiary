//Creating user model using schema

import mongoose from 'mongoose';

const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now //don't use () ,so it will called it right now
    }
  });


  module.exports=mongoose.model('user',UserSchema)  //creating model using that schema 
   //mongoose.model(name_of_model,schema_structure)

